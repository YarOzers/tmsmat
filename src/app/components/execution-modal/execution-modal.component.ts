import {AfterViewInit, Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {TestCaseService} from "../../services/test-case.service";
import {TestCaseExecutionComponent} from "../test-case-execution/test-case-execution.component";

@Component({
  selector: 'app-execution-modal',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './execution-modal.component.html',
  styleUrl: './execution-modal.component.css'
})
export class ExecutionModalComponent implements AfterViewInit{
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @ContentChild(TestCaseExecutionComponent) testCaseExecutionComponent!: TestCaseExecutionComponent;
  constructor(private testCaseService: TestCaseService) {}

  ngAfterViewInit(): void {

  }

  testCase: any;

  ngAfterContentInit() {
    // Проверка, что ContentChild корректно инициализирован
    if (!this.testCaseExecutionComponent) {
      console.error('CreateTestCaseComponent not found');
    }
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit(); // Уведомляем родительский компонент о закрытии
  }

  saveTestCase() {
    if (this.testCaseExecutionComponent) {
      const data = this.testCaseExecutionComponent.getTestCaseData();
      this.testCase = {
        ...data
      };
      this.closeModal();
    } else {
      console.error('CreateTestCaseComponent not found');
    }
  }
}

import {Component, ContentChild, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {TestCaseService} from "../../services/test-case.service";
import {TestCaseComponent} from "../test-case/test-case.component";

@Component({
  selector: 'app-fullscreen-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './fullscreen-modal.component.html',
  styleUrl: './fullscreen-modal.component.css'
})
export class FullscreenModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @ContentChild(CreateTestCaseComponent) createTestCaseComponent!: CreateTestCaseComponent;
  constructor(private testCaseService: TestCaseService) {}

  testCase: any;

  ngAfterContentInit() {
    // Проверка, что ContentChild корректно инициализирован
    if (!this.createTestCaseComponent) {
      console.error('CreateTestCaseComponent not found');
    }
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit(); // Уведомляем родительский компонент о закрытии
  }

  saveTestCase() {
    if (this.createTestCaseComponent) {
      const data = this.createTestCaseComponent.getTestCaseData();
      this.testCase = {
        ...data
      };
      this.testCaseService.saveTestCase(this.testCase); // Сохраняем через сервис
      this.closeModal();
    } else {
      console.error('CreateTestCaseComponent not found');
    }
  }
}

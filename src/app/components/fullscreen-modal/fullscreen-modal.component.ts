import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";

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

  closeModal() {
    this.isOpen = false;
    this.close.emit(); // Уведомляем родительский компонент о закрытии
  }

  saveTestCase() {

  }
}

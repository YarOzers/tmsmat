import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {TestCaseService} from "../../services/test-case.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    CreateTestCaseComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(private testCaseService: TestCaseService) {}

  saveTestCase(): void {
    this.testCaseService.saveTestCase();
  }
}

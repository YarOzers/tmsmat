import {Component} from '@angular/core';
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {FullscreenModalComponent} from "../fullscreen-modal/fullscreen-modal.component";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatButtonModule,
    MatMenuModule,
    NgIf,
    FullscreenModalComponent,
    CreateTestCaseComponent,
    FlexModule
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }
}


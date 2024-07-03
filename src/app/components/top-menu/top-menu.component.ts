import {Component, inject} from '@angular/core';
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.maxWidth = '100%';
    dialogConfig.maxHeight = '100%';
    dialogConfig.panelClass = 'full-screen-dialog'; // Добавьте, если вам нужно добавить дополнительные стили
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


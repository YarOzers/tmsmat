import {Component, inject} from '@angular/core';
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";

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
    const dialogRef = this.dialog.open(CreateTestCaseComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


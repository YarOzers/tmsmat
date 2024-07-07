import {Component, computed, NgModule, OnInit, signal} from '@angular/core';
import {FormControl, FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";


export interface Row {
  position: number;
  step: string;
  expectedResult: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ROW_DATA: Row[] = [
  {position: 1, step: 'first step', expectedResult: 'first expected result'},
  {position: 2, step: 'second step', expectedResult: 'second expected result'},
  {position: 3, step: 'third step', expectedResult: 'third expected result'},
  {position: 4, step: 'fourth step', expectedResult: 'fourth expected result'},
  {position: 5, step: 'fifth step', expectedResult: 'fifth expected result'},
  {position: 6, step: 'sixth step', expectedResult: 'sixth expected result'},
]


@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    FormsModule,
    QuillModule,
    CustomToolbarComponent,
    FlexLayoutModule,
    MatButton,
    NgForOf,
    MatSelectionList,
    MatListOption,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {


  rows: Row[] = [{position: 0, step: '', expectedResult: ''}]// Массив для хранения шагов
  modules = {
    toolbar: '#custom-toolbar'
  };


  addRow() {
    this.rows.push({position: 0, step: '', expectedResult: ''});
    console.log(this.rows);
  }


  deleteRow() {
    // if (this.rows.forEach())
    // this.rows.pop();
  }


  displayedColumns: string[] = ['select', 'step', 'expectedResult'];
  dataSource = new MatTableDataSource<Row>(ROW_DATA);
  selection = new SelectionModel<Row>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

@NgModule({
  imports: [
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{header: [1, 2, false]}],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
    })
  ]
})

class QuillConfigModule {
}

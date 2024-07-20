import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, TitleCasePipe} from "@angular/common";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

interface TestCaseTablePresentation {
  id: number;
  name: string;
  priority: string;
  author: string;
  type: string;
}

const ELEMENT_DATA: TestCaseTablePresentation[] = [
  { id: 1, name: 'Test Case 1', priority: 'High', author: 'Author 1', type: 'Functional' },
  { id: 2, name: 'Test Case 2', priority: 'Medium', author: 'Author 2', type: 'Regression' },
  { id: 3, name: 'Test Case 3', priority: 'Medium', author: 'Author 3', type: 'Regression' },
  { id: 4, name: 'Test Case 4', priority: 'Medium', author: 'Author 4', type: 'Regression' },
  { id: 5, name: 'Test Case 5', priority: 'Medium', author: 'Author 5', type: 'Regression' },
  { id: 6, name: 'Test Case 6', priority: 'Medium', author: 'Author 6', type: 'Regression' },
  // ...добавьте другие тестовые данные
];
@Component({
  selector: 'app-test-case-table',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatTable,
    MatHeaderCell,
    MatSort,
    MatSortModule,
    MatColumnDef,
    NgForOf,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCheckbox,
    MatMenu,
    MatCellDef,
    CdkDrag,
    MatMenuTrigger,
    MatIcon,
    MatIconButton,
    CdkDropList,
    CdkDragHandle
  ],
  templateUrl: './test-case-table.component.html',
  styleUrl: './test-case-table.component.css'
})
export class TestCaseTableComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'priority', 'author', 'type'];
  allColumns: string[] = ['id', 'name', 'priority', 'author', 'type'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  toggleColumn(column: string) {
    const index = this.displayedColumns.indexOf(column);
    if (index > -1) {
      this.displayedColumns.splice(index, 1);
    } else {
      this.displayedColumns.push(column);
    }
  }

  dropTable(event: CdkDragDrop<TestCaseTablePresentation[]>) {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.dataSource.data];
  }

  ngOnInit(): void {
  }
}

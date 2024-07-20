import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
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
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

interface TestCaseTablePresentation {
  id: number;
  name: string;
  priority: string;
  author: string;
  type: string;
  auto: boolean;
  selected?: boolean;
}

const ELEMENT_DATA: TestCaseTablePresentation[] = [
  { id: 1, name: 'Test Case 1', priority: 'High', author: 'Author 1', type: 'Functional', auto: true },
  { id: 2, name: 'Test Case 2', priority: 'Medium', author: 'Author 2', type: 'Regression', auto: true  },
  { id: 3, name: 'Test Case 3', priority: 'Medium', author: 'Author 3', type: 'Regression', auto: false  },
  { id: 4, name: 'Test Case 4', priority: 'Medium', author: 'Author 4', type: 'Regression', auto: true  },
  { id: 5, name: 'Test Case 5', priority: 'Medium', author: 'Author 5', type: 'Regression', auto: false  },
  { id: 6, name: 'Test Case 6', priority: 'Medium', author: 'Author 6', type: 'Regression', auto: true  },
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
    CdkDragHandle,
    CdkDropListGroup,
    FormsModule,
    MatButton,
    NgIf
  ],
  templateUrl: './test-case-table.component.html',
  styleUrl: './test-case-table.component.css'
})
export class TestCaseTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'auto'];
  allColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'auto'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  draggingRow: any = null;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  get displayedColumnsWithSelectAndRun(): string[] {
    return ['select', 'run', ...this.displayedColumns];
  }

  get headerColumns(): string[] {
    return ['select','run', ...this.displayedColumns ];
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

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onDragStarted(row: any) {
    this.draggingRow = row;
  }

  onDragEnded() {
    this.draggingRow = null;
  }

  isAllSelected(): boolean {
    return this.dataSource.data.every(element => element.auto && element.selected);
  }

  isAnySelected(): boolean {
    return this.dataSource.data.some(element => element.auto && element.selected);
  }

  toggleSelectAll(event: any) {
    const isChecked = event.checked;
    this.dataSource.data.forEach(element => {
      if (element.auto) {
        element.selected = isChecked;
      }
    });
  }

  runTest(testCase: TestCaseTablePresentation) {
    console.log(`Running test: ${testCase.name}`);
    // Здесь можно добавить логику для запуска автотеста
  }

  runSelectedTests() {
    const selectedTests = this.dataSource.data.filter(element => element.auto && element.selected);
    selectedTests.forEach(testCase => this.runTest(testCase));
  }
}

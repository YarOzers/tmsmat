import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
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
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {FullscreenModalComponent} from "../fullscreen-modal/fullscreen-modal.component";
import {TestCase} from "../../interfaces/test-case.interfase";
import {TestCaseService} from "../../services/test-case.service";


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
    NgIf,
    MatProgressSpinner,
    CreateTestCaseComponent,
    FullscreenModalComponent
  ],
  templateUrl: './test-case-table.component.html',
  styleUrl: './test-case-table.component.css'
})
export class TestCaseTableComponent implements AfterViewInit, OnInit{
  TEST_CASE_DATA: TestCase[] = [
  ];
  displayedColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'automationFlag'];
  allColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'automationFlag'];
  dataSource: MatTableDataSource<TestCase>;
  draggingRow: any = null;
  isModalOpen = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private testCaseService: TestCaseService) {
    this.dataSource = new MatTableDataSource(this.TEST_CASE_DATA);
  }

  ngOnInit(): void {
    this.testCaseService.TEST_CASE_DATA$.subscribe(data => {
      this.TEST_CASE_DATA = data;
      this.dataSource.data = this.TEST_CASE_DATA;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  get displayedColumnsWithSelectAndRun(): string[] {
    return ['select', ...this.displayedColumns, 'run'];
  }

  get headerColumns(): string[] {
    return ['select', ...this.displayedColumns, 'run'];
  }

  toggleColumn(column: string) {
    const index = this.displayedColumns.indexOf(column);
    if (index > -1) {
      this.displayedColumns.splice(index, 1);
    } else {
      this.displayedColumns.push(column);
    }
  }

  dropTable(event: CdkDragDrop<TestCase[]>) {
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
    return this.dataSource.data.every(element => element.automationFlag && element.selected);
  }

  isIndeterminate(): boolean {
    return this.dataSource.data.some(element => element.automationFlag && element.selected) && !this.isAllSelected();
  }

  toggleSelectAll(event: any) {
    const isChecked = event.checked;
    this.dataSource.data.forEach(element => {
      if (element.automationFlag) {
        element.selected = isChecked;
      }
    });
    this.onCheckboxChange();
  }

  onCheckboxChange() {
    // Чтобы триггерить обновление UI
    this.dataSource.data = [...this.dataSource.data];
  }

  runTest(testCase: TestCase) {
    console.log(`Running test: ${testCase.name}`);
    testCase.loading = true; // Включаем лоадер

    // Эмулируем выполнение автотеста с помощью таймера
    setTimeout(() => {
      testCase.loading = false; // Выключаем лоадер
      this.dataSource.data = [...this.dataSource.data]; // Обновляем таблицу для перерисовки
      console.log(`Test completed: ${testCase.name}`);
    }, 3000); // Таймер на 3 секунды
  }

  runSelectedTests() {
    const selectedTests = this.dataSource.data.filter(element => element.automationFlag && element.selected);
    selectedTests.forEach(testCase => this.runTest(testCase));
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  showData() {
    console.log(this.TEST_CASE_DATA);
  }
}

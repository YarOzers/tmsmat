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
import {TestCaseService} from "../../services/test-case.service";
import {ExecutionModalComponent} from "../execution-modal/execution-modal.component";
import {TestCaseExecutionComponent} from "../test-case-execution/test-case-execution.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {TreeNode} from "../packages/packages.component";
import {TestCase} from "../../interfaces/test-case.interfase";
import {TreeNodeService} from "../../services/tree-node.service";


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
    FullscreenModalComponent,
    ExecutionModalComponent,
    TestCaseExecutionComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule
  ],
  templateUrl: './test-case-table.component.html',
  styleUrl: './test-case-table.component.css'
})
export class TestCaseTableComponent implements AfterViewInit, OnInit {
  TREE_DATA: TreeNode[] = [];

  displayedColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'automationFlag'];
  allColumns: string[] = ['id', 'name', 'priority', 'author', 'type', 'automationFlag'];
  dataSource: MatTableDataSource<TestCase>;
  draggingRow: any = null;
  isModalOpen = false;
  folderFilter: string = 'root';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private testCaseService: TestCaseService,
              private treeNodeService: TreeNodeService) {
    this.dataSource = new MatTableDataSource<TestCase>([]);
  }

  ngOnInit(): void {
    const extractedTestCases = this.extractTestCases(this.TREE_DATA);
    this.dataSource.data = extractedTestCases;
    console.log('Data Source Initialized:', this.dataSource.data); // Отладочный вывод
    this.TREE_DATA = this.treeNodeService.TREE_DATA;
    console.log("From testCaseComponent: ", this.TREE_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  extractTestCases(treeNodes: TreeNode[]): TestCase[] {
    let testCases: TestCase[] = [];
    for (const node of treeNodes) {
      if (node.type === 'test-case' && node.data) {
        testCases.push(node.data as TestCase);
      }
      if (node.children) {
        testCases = testCases.concat(this.extractTestCases(node.children));
      }
    }
    return testCases;
  }

  filterDataByFolder(folderName: string): void {
    const extractedTestCases = this.extractTestCases(this.TREE_DATA);
    if (folderName === 'root') {
      this.dataSource.data = extractedTestCases;
    } else {
      this.dataSource.data = extractedTestCases.filter(testCase => testCase.folder === folderName);
    }
  }

  setFolderFilter(folder: string): void {
    this.folderFilter = folder;
    this.filterDataByFolder(folder);
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
    this.dataSource.data = [...this.dataSource.data];
  }

  runTest(testCase: TestCase) {
    console.log(`Running test: ${testCase.name}`);
    testCase.loading = true;

    setTimeout(() => {
      testCase.loading = false;
      this.dataSource.data = [...this.dataSource.data];
      console.log(`Test completed: ${testCase.name}`);
    }, 3000);
  }

  runSelectedTests() {
    const selectedTests = this.dataSource.data.filter(element => element.automationFlag && element.selected);
    selectedTests.forEach(testCase => this.runTest(testCase));
  }

  openModal() {
    this.isModalOpen = true;
    console.log(this.dataSource.data);
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  showData() {
    console.log(this.dataSource.data);
  }

  showObjectFromRow(row: any) {
    const foundObject = this.dataSource.data.find(item => item.id === row.id);
    if (foundObject) {
      console.log(foundObject);
    } else {
      console.log('Object not found');
    }
  }

  getFolders(treeNodes: TreeNode[]): string[] {
    let folders: string[] = [];
    for (const node of treeNodes) {
      if (node.type === 'folder') {
        folders.push(node.name);
        if (node.children) {
          folders = folders.concat(this.getFolders(node.children));
        }
      }
    }
    return folders;
  }
}

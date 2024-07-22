import {Injectable} from '@angular/core';
import {PostConditionItem, PreConditionItem, StepItem} from '../components/test-case/test-case.component';
import {BehaviorSubject} from "rxjs";
import {TestCase} from "../interfaces/test-case.interfase";


// const TEST_CASE_DATA: TestCase[] = [];


interface TestCaseTablePresentation {
  id: number;
  name: string;
  priority: string;
  author: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  private TEST_CASE_DATA: TestCase[] = [];
  private dataSubject = new BehaviorSubject(this.TEST_CASE_DATA);

  TEST_CASE_DATA$ = this.dataSubject.asObservable();

  private testCaseId = 0;
  private testCaseName = '';
  private testCaseStepItemsArray: StepItem[] = [];
  private testCasePreconditionItemsArray: PreConditionItem[] = [];
  private testCasePostconditionItemsArray: PostConditionItem[] = [];
  private testCasePriority = 1;
  private testCaseTime = '';
  private testCaseAutomationFlag = true;
  private testCaseType = 1;
  private testCaseAuthor = 'Some author';
  private testCaseSelected = false;
  private testCaseLoading = false;

  private testCase: TestCase = {
    id: this.testCaseId,
    name: this.testCaseName,
    stepItems: this.testCaseStepItemsArray,
    preConditionItems: this.testCasePreconditionItemsArray,
    postConditionItems: this.testCasePostconditionItemsArray,
    priority: this.testCasePriority,
    executionTime: this.testCaseTime,
    automationFlag: this.testCaseAutomationFlag,
    type: this.testCaseType,
    author: this.testCaseAuthor,
    selected: this.testCaseSelected,
    loading: this.testCaseLoading
  }


  constructor() {
  }

  getTestCaseStepItems(): StepItem[] {
    return this.testCaseStepItemsArray;
  }

  setStepItems(testCases: StepItem[]): void {
    this.testCaseStepItemsArray = testCases;
  }

  addToTestCaseStepItemsArray(item: any): void {
    this.testCaseStepItemsArray.push(item);
  }

  clearTestCaseStepItemsArray(): void {
    this.testCaseStepItemsArray = [];
  }

  getTestCasePreconditionItems(): StepItem[] {
    return this.testCasePreconditionItemsArray;
  }

  setPreconditionItems(testCases: StepItem[]): void {
    this.testCasePreconditionItemsArray = testCases;
  }

  addToTestCasePreconditionItemsArray(item: any): void {
    this.testCasePreconditionItemsArray.push(item);
  }

  clearTestCasePreconditionItemsArray(): void {
    this.testCasePreconditionItemsArray = [];
  }

  getTestCasePostConditionItems(): StepItem[] {
    return this.testCasePostconditionItemsArray;
  }

  setPostConditionItems(testCases: StepItem[]): void {
    this.testCasePostconditionItemsArray = testCases;
  }

  addToTestCasePostConditionArray(item: any): void {
    this.testCasePostconditionItemsArray.push(item);
  }

  clearTestCasePostConditionItemsArray(): void {
    this.testCasePostconditionItemsArray = [];
  }

  saveTestCaseStepItems(): void {
    this.testCaseStepItemsArray.forEach((item, index) => {
      if (item.actionEditor) {
        item.action = item.actionEditor.getData();
      }
      if (item.expectedResultEditor) {
        item.expectedResult = item.expectedResultEditor.getData();
      }
    });

    console.log(this.testCaseStepItemsArray); // Для проверки, что данные корректно обновлены
    // Здесь можно добавить вызов сервиса для сохранения данных, например:
    // this.http.post('/api/saveTestCase', this.items).subscribe();
  }

  saveTestCasePreConditionItems(): void {
    this.testCasePreconditionItemsArray.forEach((item, index) => {
      if (item.actionEditor) {
        item.action = item.actionEditor.getData();
      }
      if (item.expectedResultEditor) {
        item.expectedResult = item.expectedResultEditor.getData();
      }
    });

    console.log(this.testCasePreconditionItemsArray); // Для проверки, что данные корректно обновлены
    // Здесь можно добавить вызов сервиса для сохранения данных, например:
    // this.http.post('/api/saveTestCase', this.items).subscribe();
  }

  saveTestCasePostConditionItems(): void {
    this.testCasePostconditionItemsArray.forEach((item, index) => {
      if (item.actionEditor) {
        item.action = item.actionEditor.getData();
      }
      if (item.expectedResultEditor) {
        item.expectedResult = item.expectedResultEditor.getData();
      }
    });

    console.log(this.testCasePostconditionItemsArray); // Для проверки, что данные корректно обновлены
    // Здесь можно добавить вызов сервиса для сохранения данных, например:
    // this.http.post('/api/saveTestCase', this.items).subscribe();
  }

  saveTestCase(testCase: TestCase) {
    console.log("saved this testCase: ", testCase)
    this.TEST_CASE_DATA.push(testCase);
    console.log('TEST_CASE_DATA:', this.TEST_CASE_DATA);

  }

  getTestCases(): TestCase[] {
    return this.TEST_CASE_DATA;
  }

  setTestCaseId(id: number) {
    this.testCaseId = id;
  }

  setTestCaseName(name: string) {
    this.testCaseName = name;
  }

  setTestCasePriority(priority: number) {
    this.testCasePriority = priority;
  }

  setTestCaseTime(time: string) {
    this.testCaseTime = time;
  }


  getTestCaseData() {
    return this.TEST_CASE_DATA;
  }

  addTestCaseInData(testCase: TestCase) {
    this.TEST_CASE_DATA.push(testCase);
    this.dataSubject.next(this.TEST_CASE_DATA)
    console.log(testCase);
    console.log("TestCase was added into array TEST_CASE_DATA :" + this.TEST_CASE_DATA)
  }
}

import {Injectable} from '@angular/core';
import {PostConditionItem, PreConditionItem, StepItem} from '../components/test-case/test-case.component';

const TEST_CASE_DATA: TestCase[] = [];

interface TestCase {
  id: number;
  name: string;
  stepItems: StepItem[] | null;
  preConditionItems: PreConditionItem[] | null;
  postConditionItems: PostConditionItem[] | null;
  priority: string | null;
  time: string | null;
  attribute: string | null;
  folder: string | null;
}

interface TestCaseTablePresentation{
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
  private testCaseData: TestCase[] = [];

  private testCaseId = 0;
  private testCaseName = '';
  private testCaseStepItemsArray: StepItem[] = [];
  private testCasePreconditionItemsArray: PreConditionItem[] = [];
  private testCasePostconditionItemsArray: PostConditionItem[] = [];
  private testCasePriority = '';
  private testCaseTime = '';
  private testCaseAttribute = '';
  private testCaseFolder = '';

  private testCase: TestCase = {
    id: this.testCaseId,
    name: this.testCaseName,
    stepItems: this.testCaseStepItemsArray,
    preConditionItems: this.testCasePreconditionItemsArray,
    postConditionItems: this.testCasePostconditionItemsArray,
    priority: this.testCasePriority,
    time: this.testCaseTime,
    attribute: this.testCaseAttribute,
    folder: this.testCaseFolder
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
    this.testCaseData.push(testCase);
    console.log('Test case saved:', testCase);
  }
  getTestCases(): TestCase[] {
    return this.testCaseData;
  }
  setTestCaseId(id: number){
    this.testCaseId = id;
  }

  setTestCaseName(name: string){
    this.testCaseName = name;
  }

  setTestCasePriority(priority: string){
    this.testCasePriority = priority;
  }

  setTestCaseTime(time: string){
    this.testCaseTime = time;
  }

  setTestCaseAttribute(attribute: string){
    this.testCaseAttribute = attribute;
  }

  getTestCaseData(){
    return TEST_CASE_DATA;
  }
}

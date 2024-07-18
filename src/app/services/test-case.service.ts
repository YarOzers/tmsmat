import {Injectable} from '@angular/core';
import {PostConditionItem, PreConditionItem, StepItem} from '../components/test-case/test-case.component';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private testCaseStepItemsArray: StepItem[] = [];
  private testCasePreconditionItemsArray: PreConditionItem[] = [];
  private testCasePostconditionItemsArray: PostConditionItem[] = [];


  constructor() {}

  getTestCaseStepItems(): StepItem[]{
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
  getTestCasePreconditionItems(): StepItem[]{
    return this.testCasePreconditionItemsArray;
  }

  setPreconditionItems(testCases: StepItem[]): void {
    this.testCasePreconditionItemsArray = testCases;
  }

  addToTestCasePreconditionItemsArray(item: any): void {
    this.testCasePreconditionItemsArray.push(item);
  }

  clearTestCasePreconditionItemsArray(): void {
    this.testCasePostconditionItemsArray = [];
  }

  getTestCasePostConditionItems(): StepItem[]{
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
}

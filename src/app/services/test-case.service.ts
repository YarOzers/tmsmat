import {Injectable} from '@angular/core';
import {PostConditionItem, PreConditionItem, StepItem} from '../components/test-case/test-case.component';
import {BehaviorSubject, Subject} from "rxjs";
import {TestCase} from "../interfaces/test-case.interfase";


@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  private eventSource = new Subject<void>();
  event$ = this.eventSource.asObservable();

  private TEST_CASE_DATA: TestCase[] = [
    {
      id: 1,
      name: "Login Test",
      stepItems: [
        {
          selected: false,
          id: 101,
          action: "Open the login page",
          expectedResult: "Login page is displayed"
        },
        {
          selected: false,
          id: 102,
          action: "Enter username and password",
          expectedResult: "User is able to enter credentials"
        },
        {
          selected: false,
          id: 103,
          action: "Click login button",
          expectedResult: "User is logged in and redirected to the dashboard"
        }
      ],
      preConditionItems: [
        {
          selected: false,
          id: 201,
          action: "User is registered",
          expectedResult: "User account exists"
        }
      ],
      postConditionItems: [
        {
          selected: false,
          id: 301,
          action: "Log out",
          expectedResult: "User is logged out and redirected to the login page"
        }
      ],
      priority: 1,
      executionTime: "11:22",
      automationFlag: true,
      type: 1,
      author: "test_author_1",
      selected: false,
      loading: false,
      folder: null
    },
    {
      id: 2,
      name: "Registration Test",
      stepItems: [
        {
          selected: false,
          id: 104,
          action: "Open the registration page",
          expectedResult: "Registration page is displayed"
        },
        {
          selected: false,
          id: 105,
          action: "Enter registration details",
          expectedResult: "User is able to enter registration details"
        },
        {
          selected: false,
          id: 106,
          action: "Click register button",
          expectedResult: "User account is created and user is redirected to the login page"
        }
      ],
      preConditionItems: null,
      postConditionItems: [
        {
          selected: false,
          id: 302,
          action: "Verify email",
          expectedResult: "User receives verification email"
        }
      ],
      priority: 2,
      executionTime: "10:22",
      automationFlag: false,
      type: 2,
      author: "test_author_2",
      selected: false,
      loading: false,
      folder: null
    },
    {
      id: 3,
      name: "Password Reset Test",
      stepItems: [
        {
          selected: false,
          id: 107,
          action: "Open the forgot password page",
          expectedResult: "Forgot password page is displayed"
        },
        {
          selected: false,
          id: 108,
          action: "Enter registered email",
          expectedResult: "User is able to enter their email"
        },
        {
          selected: false,
          id: 109,
          action: "Click reset password button",
          expectedResult: "User receives a password reset email"
        }
      ],
      preConditionItems: [
        {
          selected: false,
          id: 202,
          action: "User is registered",
          expectedResult: "User account exists"
        }
      ],
      postConditionItems: [
        {
          selected: false,
          id: 303,
          action: "Verify password reset",
          expectedResult: "User can log in with the new password"
        }
      ],
      priority: 1,
      executionTime: "12:44",
      automationFlag: true,
      type: 1,
      author: "test_author_3",
      selected: false,
      loading: false,
      folder: null
    }
  ];
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
  private testCaseFolder = '';

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
    loading: this.testCaseLoading,
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


  clearTestCaseStepItemsArray(): void {
    this.testCaseStepItemsArray = [];
  }

  getTestCasePreconditionItems(): StepItem[] {
    return this.testCasePreconditionItemsArray;
  }

  setPreconditionItems(testCases: StepItem[]): void {
    this.testCasePreconditionItemsArray = testCases;
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


  addTestCaseInData(testCase: TestCase) {
    this.TEST_CASE_DATA.push(testCase);
    this.dataSubject.next(this.TEST_CASE_DATA)
    console.log(testCase);
    console.log("TestCase was added into array TEST_CASE_DATA :" + this.TEST_CASE_DATA)
  }

  getTestCaseId() {
    return this.TEST_CASE_DATA.length;
  }

  setFolderNameInTestCase(folderName: string){
    this.testCaseFolder = folderName;
    console.log("setFolderName: ", this.testCaseFolder)
  }
  getFolderName() {
    return this.testCaseFolder;
  }

  getTestCaseName() {
    return this.testCase.name;
  }

  saveTestCase(data: TestCase) {
    this.testCase = data;
    console.log("testCase in Service: ", this.testCase);
    this.eventSource.next();
  }
}

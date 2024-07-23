import {BalloonEditor} from "ckeditor5";

export interface TestCaseTablePresentation {
  id: number;
  name: string;
  priority: string;
  author: string;
  type: string;
  auto: boolean;
  selected?: boolean;
  loading?: boolean; // Добавлено свойство для отслеживания состояния загрузки
}

export interface TestCase {
  id: number;
  name: string;
  stepItems: TestCaseStep[] | null;
  preConditionItems: TestCasePreCondition[] | null;
  postConditionItems: TestCasePostCondition[] | null;
  priority: number | null;
  executionTime: string | null;
  automationFlag: boolean | undefined;
  type: number | null;
  author: string | null;
  selected: boolean | null;
  loading: boolean | null;
  folder: string | null;
}


export interface TestCaseStep {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

export interface TestCasePreCondition {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

export interface TestCasePostCondition {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

export interface CheckList {
  id: number;
  name: string;
  stepItems: CheckListStep[] | null;
  preConditionItems: CheckListPreCondition[] | null;
  postConditionItems: CheckListPostCondition[] | null;
  priority: number | null;
  executionTime: string | null;
  automationFlag: boolean | undefined;
  type: number | null;
  author: string | null;
  selected: boolean | null;
  loading: boolean | null;
  folder: string | null;
}

export interface CheckListStep {
  selected: boolean;
  id: number;
  row: string;
  rowEditor?: BalloonEditor;

}

export interface CheckListPreCondition {
  selected: boolean;
  id: number;
  row: string;
  rowEditor?: BalloonEditor;

}

export interface CheckListPostCondition {
  selected: boolean;
  id: number;
  row: string;
  rowEditor?: BalloonEditor;
}

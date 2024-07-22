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
  stepItems: StepItem[] | null;
  preConditionItems: PreConditionItem[] | null;
  postConditionItems: PostConditionItem[] | null;
  priority: number | null;
  executionTime: string | null;
  automationFlag: boolean | undefined;
  type: number | null;
  author: string | null;
  selected: boolean | null;
  loading: boolean | null;
  folder: string | null;
}

export interface StepItem {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

export interface PreConditionItem {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

export interface PostConditionItem {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string
  actionEditor?: BalloonEditor;
  expectedResultEditor?: BalloonEditor;
}

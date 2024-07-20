import {PostConditionItem, PreConditionItem, StepItem} from "../components/test-case/test-case.component";

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
  priority: string | null;
  time: string | null;
  attribute: string | null;
  folder: string | null;
}

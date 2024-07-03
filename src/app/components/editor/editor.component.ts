import {Component, computed, NgModule, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import Editor from "quill/core/editor";


export interface PeriodicElement {
  name: string;
  position: number;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    FormsModule,
    QuillModule,
    CustomToolbarComponent,
    FlexLayoutModule,
    MatButton,
    NgForOf,
    MatSelectionList,
    MatListOption,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  steps = [{ input1: '', input2: '' }]// Массив для хранения шагов
  modules = {
    toolbar: '#custom-toolbar'
  };


  addStep() {
    this.steps.push({ input1: '', input2: '' });
  }


/////////////

  readonly task = signal<Task>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      {name: 'Child task 1', completed: false},
      {name: 'Child task 2', completed: false},
      {name: 'Child task 3', completed: false},
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

}

@NgModule({
  imports: [
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{header: [1, 2, false]}],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
    })
  ]
})
class QuillConfigModule {
}

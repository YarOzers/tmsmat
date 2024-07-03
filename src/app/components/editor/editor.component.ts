import {Component, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    FormsModule,
    QuillModule,
    CustomToolbarComponent,
    FlexLayoutModule,
    MatButton,
    NgForOf
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  steps = [{ input1: '', input2: '' }]; // Массив для хранения шагов
  modules = {
    toolbar: '#custom-toolbar'
  };

  addStep() {
    this.steps.push({ input1: '', input2: '' });
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

import {AfterViewInit, Component, ElementRef, NgModule, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
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
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {NoHtmlPipePipe} from "./no-html-pipe.pipe";

interface Item {
  selected: boolean;
  id: number;
  action: string;
  expectedResult: string;
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
    MatRowDef,
    NgIf,
    NoHtmlPipePipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit{
  @ViewChildren('quillEditor') quillEditors!: QueryList<ElementRef>;
  itemId: number = 2;
  editingActionIndex: number | null = null;
  editingExpectedResultIndex: number | null = null;
  toolbarVisible: boolean = true;

  step: Item =
    {
      selected:false,
      id: 0,
      action: '',
      expectedResult: ''
    }
  modules = {
    toolbar: '#custom-toolbar'
  };
  protected selectedAll: boolean = false;
  constructor(private renderer: Renderer2) {
  }
  ngAfterViewInit() {

  }


  //  самодельная таблица
  items: Item[] = [
    {
      selected: false,
      id: 1,
      action: '',
      expectedResult: ''
    }

  ];

  selectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.items.forEach(item => item.selected = checked);
    this.selectedAll = checked;
  }

  addItem() {
    this.items.push({selected:false, id:this.itemId , action: '',expectedResult: ''});
    this.itemId = this.itemId + 1;
    this.updateSelectAllState();
  }

  deleteSelected(): void {
    this.items = this.items.filter(item => !item.selected);
    this.reorderIds();
    if (this.selectedAll){
      this.selectedAll = false;
      this.itemId = 1;
    }
  }

  reorderIds(): void {
    this.items.forEach((item, index) => {
      item.id = index + 1;
    });
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  editAction(index: number): void {
    this.editingActionIndex = index;
    this.editingExpectedResultIndex = null;
  }

  editExpectedResult(index: number): void {
    this.editingExpectedResultIndex = index;
    this.editingActionIndex = null;
  }

  stripHtml(html: string): string {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  }

  updateSelectAllState(): void {
    this.selectedAll = this.items.every(item => item.selected);
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
        ],
        imageResize: {}
      }
    })
  ]
})

class QuillConfigModule {
}

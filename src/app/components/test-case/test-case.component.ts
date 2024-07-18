import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

import {
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonEditor,
  Base64UploadAdapter,
  BlockQuote,
  BlockToolbar,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {QuillEditorComponent} from "ngx-quill";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TestCaseService} from "../../services/test-case.service";

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

@Component({
  selector: 'app-test-case',
  standalone: true,
  imports: [CommonModule, CKEditorModule, CustomToolbarComponent, FlexModule, MatButton, QuillEditorComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './test-case.component.html',
  styleUrl: './test-case.component.css'
})
export class TestCaseComponent implements OnInit, AfterViewInit {
  @ViewChildren('editorElement') editorElements!: QueryList<ElementRef>;


  stepItemId: number = 1;
  preConditionItemId: number = 1;
  postConditionItemId: number = 1;
  protected selectedAllSteps: boolean = false;
  protected selectedAllPreConditions: boolean = false;
  protected selectedAllPostConditions: boolean = false;

  stepItems = this.testCaseService.getTestCaseStepItems();
  preConditionItems = this.testCaseService.getTestCasePreconditionItems();
  postConditionItems = this.testCaseService.getTestCasePostConditionItems();

  constructor(private changeDetector: ChangeDetectorRef,
              private testCaseService: TestCaseService,
              private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.testCaseService.clearTestCaseStepItemsArray();
    this.testCaseService.clearTestCasePreconditionItemsArray();
    this.testCaseService.clearTestCasePostConditionItemsArray();
  }

  public isLayoutReady = false;
  public Editor = BalloonEditor;
  public config: any = {};

  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'showBlocks',
          'findAndReplace',
          'selectAll',
          'textPartLanguage',
          '|',
          'heading',
          'style',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'code',
          'removeFormat',
          '|',
          'specialCharacters',
          'horizontalLine',
          'link',
          'insertImage',
          'mediaEmbed',
          'insertTable',
          'highlight',
          'blockQuote',
          'codeBlock',
          'htmlEmbed',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'indent',
          'outdent',
          '|',
          'accessibilityHelp'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        Base64UploadAdapter,
        BlockQuote,
        BlockToolbar,
        Bold,
        Code,
        CodeBlock,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Markdown,
        MediaEmbed,
        Paragraph,
        PasteFromMarkdownExperimental,
        PasteFromOffice,
        RemoveFormat,
        SelectAll,
        ShowBlocks,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextPartLanguage,
        TextTransformation,
        TodoList,
        Underline,
        Undo
      ],
      blockToolbar: [
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'insertImage',
        'insertTable',
        '|',
        'bulletedList',
        'numberedList',
        'indent',
        'outdent'
      ],
      fontFamily: {
        supportAllValues: true
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true
          }
        ]
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage'
        ]
      },
      initialData: '',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      }
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
    this.addStepItem();
    this.addPreConditionItem();
    this.addPostConditionItem();
    this.initializeEditors();
  }
  initializeEditors(): void {
    this.stepItems.forEach(item => {
      this.initializeEditor(item, 'actionEditor');
      this.initializeEditor(item, 'expectedResultEditor');
    });

    this.preConditionItems.forEach(item => {
      this.initializeEditor(item, 'actionEditor');
      this.initializeEditor(item, 'expectedResultEditor');
    });

    this.postConditionItems.forEach(item => {
      this.initializeEditor(item, 'actionEditor');
      this.initializeEditor(item, 'expectedResultEditor');
    });
  }

  initializeEditor(item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('Initializing Editor:', item, editorField);
    // Simulating editor instance creation
    item[editorField] = { editorInstance: { editing: { view: { focus: () => console.log('Focusing editor') } } } };
    console.log('Initialized Item:', item);
  }

  selectAllSteps(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.stepItems.forEach(item => item.selected = checked);
    this.selectedAllSteps = checked;
  }

  selectAllPreConditions(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.preConditionItems.forEach(item => item.selected = checked);
    this.selectedAllPreConditions = checked;
  }

  selectAllPostConditions(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.postConditionItems.forEach(item => item.selected = checked);
    this.selectedAllPostConditions = checked;
  }

  addStepItem() {
    this.stepItems.push({selected: false, id: this.stepItemId, action: '', expectedResult: ''});
    this.stepItemId = this.stepItemId + 1;
    this.updateSelectAllStepsState();
    console.log(this.stepItems);
  }

  addPreConditionItem() {
    this.preConditionItems.push({selected: false, id: this.preConditionItemId, action: '', expectedResult: ''});
    this.preConditionItemId = this.preConditionItemId + 1;
    this.updateSelectAllStepsState();
    console.log(this.preConditionItems);
  }

  addPostConditionItem() {
    this.postConditionItems.push({selected: false, id: this.postConditionItemId, action: '', expectedResult: ''});
    this.postConditionItemId = this.postConditionItemId + 1;
    this.updateSelectAllPostConditionsState();
    console.log(this.postConditionItems);
  }

  deleteSelectedStep(): void {
    this.stepItems = this.stepItems.filter(item => !item.selected);
    this.reorderStepIds();
    if (this.selectedAllSteps) {
      this.selectedAllSteps = false;
      this.stepItemId = 1;
    }
  }

  deleteSelectedPreCondition(): void {
    this.preConditionItems = this.preConditionItems.filter(item => !item.selected);
    this.reorderPreConditionIds();
    if (this.selectedAllPreConditions) {
      this.selectedAllPreConditions = false;
      this.stepItemId = 1;
    }
  }

  deleteSelectedPostCondition(): void {
    this.postConditionItems = this.postConditionItems.filter(item => !item.selected);
    this.reorderPostConditionIds();
    if (this.selectedAllPostConditions) {
      this.selectedAllPostConditions = false;
      this.stepItemId = 1;
    }
  }

  updateSelectAllStepsState(): void {
    this.selectedAllSteps = this.stepItems.every((item) => item.selected);
  }

  updateSelectAllPreConditionsState(): void {
    this.selectedAllPreConditions = this.preConditionItems.every((item) => item.selected);
  }

  updateSelectAllPostConditionsState(): void {
    this.selectedAllPostConditions = this.postConditionItems.every((item) => item.selected);
  }

  reorderStepIds(): void {
    this.stepItems.forEach((item, index) => {
      item.id = index + 1;
    });
    this.stepItemId = this.stepItems.length + 1;
  }

  reorderPreConditionIds(): void {
    this.preConditionItems.forEach((item, index) => {
      item.id = index + 1;
    });
    this.preConditionItemId = this.preConditionItems.length + 1;
  }

  reorderPostConditionIds(): void {
    this.postConditionItems.forEach((item, index) => {
      item.id = index + 1;
    });
    this.postConditionItemId = this.postConditionItems.length + 1;
  }

  focusEditor(item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('Focus Editor:', item, editorField);
    if (item[editorField]) {
      console.log('Editor Field Exists:', item[editorField]);
      const editorInstance = item[editorField].editorInstance;
      if (editorInstance) {
        console.log('Editor Instance Exists:', editorInstance);
        editorInstance.editing.view.focus();
      } else {
        console.error('Editor Instance does not exist');
      }
    } else {
      console.error('Editor Field does not exist');
    }
  }


  onStepEditorReady(event: any, item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('Step Editor Ready:', event, item, editorField);
    item[editorField] = { editorInstance: event.editorInstance || event };
    console.log('Updated Item with Editor Instance:', item);
  }

  onPreConditionEditorReady(event: any, item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('PreCondition Editor Ready:', event, item, editorField);
    item[editorField] = { editorInstance: event.editorInstance || event };
    console.log('Updated Item with Editor Instance:', item);
  }

  onPostConditionEditorReady(event: any, item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('PostCondition Editor Ready:', event, item, editorField);
    item[editorField] = { editorInstance: event.editorInstance || event };
    console.log('Updated Item with Editor Instance:', item);
  }

  saveSteps() {
    this.testCaseService.setStepItems(this.stepItems);
    this.testCaseService.saveTestCaseStepItems();
  }

  savePreConditions() {
    this.testCaseService.setPreconditionItems(this.preConditionItems);
    this.testCaseService.saveTestCasePreConditionItems();
  }

  savePostConditions() {
    this.testCaseService.setPostConditionItems(this.postConditionItems);
    this.testCaseService.saveTestCasePostConditionItems();
  }

}

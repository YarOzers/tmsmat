import {
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {PackagesComponent} from "../packages/packages.component";
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {TestCaseComponent} from "../test-case/test-case.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
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
} from "ckeditor5";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {TestCaseService} from "../../services/test-case.service";
import {PostConditionItem, PreConditionItem, StepItem, TestCase} from "../../interfaces/test-case.interfase";
import {MatIcon} from "@angular/material/icon";
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {timeout} from "rxjs";


@Component({
  selector: 'app-create-test-case',
  standalone: true,
  imports: [
    FlexModule,
    PackagesComponent,
    TestCaseListComponent,
    QuillEditorComponent,
    FormsModule,
    QuillModule,
    CustomToolbarComponent,
    TestCaseComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    CKEditorModule,
    MatButton,
    NgForOf,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavModule
  ],
  templateUrl: './create-test-case.component.html',
  styleUrl: './create-test-case.component.css'
})
export class CreateTestCaseComponent implements AfterViewInit, OnInit {
  @ViewChild(TestCaseComponent) testCaseComponent!: TestCaseComponent;
  @ViewChildren('editorElement') editorElements!: QueryList<ElementRef>;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  testCaseId = 0;
  testCaseName = '';
  priority = null;
  executionTime = '';
  automationFlag = undefined;
  type = null;
  stepItemId = 1;
  preConditionItemId = 1;
  postConditionItemId = 1;
  selectedAllSteps = false;
  selectedAllPreConditions = false;
  selectedAllPostConditions = false;

  config: any = {};
  readonly Editor = BalloonEditor;
  isLayoutReady = false;

  stepItems: StepItem[] = [];
  preConditionItems: PreConditionItem[] = [];
  postConditionItems: PostConditionItem[] = [];

  testCase: TestCase = {
    id: this.testCaseId,
    name: this.testCaseName,
    stepItems: this.stepItems,
    preConditionItems: this.preConditionItems,
    postConditionItems: this.postConditionItems,
    priority: this.priority,
    executionTime: this.executionTime,
    automationFlag: this.automationFlag,
    type: this.type,
    author: 'Author',
    selected: false,
    loading: false,
    folder: null
  }


  getTestCaseData() {
    this.saveTestCase();
    return this.testCase;

  }

  constructor(private changeDetector: ChangeDetectorRef,
              private testCaseService: TestCaseService,
              private renderer: Renderer2
  ) {
  }


  ngOnInit(): void {
    this.sidenav?.open()
  }

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
    // this.addStepItem();
    // this.addPreConditionItem();
    // this.addPostConditionItem();
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
    item[editorField] = {editorInstance: {editing: {view: {focus: () => console.log('Focusing editor')}}}};
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
    item[editorField] = {editorInstance: event.editorInstance || event};
    console.log('Updated Item with Editor Instance:', item);
  }

  onPreConditionEditorReady(event: any, item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('PreCondition Editor Ready:', event, item, editorField);
    item[editorField] = {editorInstance: event.editorInstance || event};
    console.log('Updated Item with Editor Instance:', item);
  }

  onPostConditionEditorReady(event: any, item: any, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    console.log('PostCondition Editor Ready:', event, item, editorField);
    item[editorField] = {editorInstance: event.editorInstance || event};
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

  clearAllArrays(): void {
    this.stepItems = [];
    this.preConditionItems = [];
    this.postConditionItems = [];
  }

  saveTestCase(): void {
    this.testCaseId = this.testCaseService.getTestCaseId();
    this.testCase = {
      id: this.testCaseId = this.testCaseId + 1, // Автоматически увеличиваем ID
      name: this.testCaseName,
      stepItems: [...this.stepItems],
      preConditionItems: [...this.preConditionItems],
      postConditionItems: [...this.postConditionItems],
      priority: this.priority,
      executionTime: this.executionTime,
      automationFlag: this.automationFlag,
      type: this.type,
      author: 'Author',
      selected: false,
      loading: false,
      folder: null

    };
    console.log(this.testCase);
    this.testCaseService.addTestCaseInData(this.testCase);
    this.resetFields(); // Сбрасываем все поля
    this.clearAllArrays();
  }

  resetFields(): void {
    this.testCaseName = '';
    this.priority = null;
    this.executionTime = '';
    this.automationFlag = undefined;
    this.type = null;
    this.clearAllArrays();
    this.selectedAllSteps = false;
    this.selectedAllPreConditions = false;
    this.selectedAllPostConditions = false;
    this.stepItemId = 1;
    this.preConditionItemId = 1;
    this.postConditionItemId = 1;
  }

  showExecutionTime() {
    console.log(this.executionTime)
  }
}

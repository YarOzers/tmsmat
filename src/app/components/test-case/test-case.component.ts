import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  BalloonEditor,
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
  Undo,
  type EditorConfig
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {QuillEditorComponent} from "ngx-quill";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TestCaseService} from "../../services/test-case.service";

export interface Item {
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
export class TestCaseComponent implements AfterViewInit{
  @ViewChildren('editorElement') editorElements!: QueryList<ElementRef>;
  itemId: number = 1;
  toolbarVisible: boolean = true;
  protected selectedAll: boolean = false;

  items: Item[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private testCaseService: TestCaseService) {}

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
      initialData:'',
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
    this.addItem();
  }

  selectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.items.forEach(item => item.selected = checked);
    this.selectedAll = checked;
  }

  addItem() {
    this.items.push({ selected: false, id: this.itemId, action: '', expectedResult: '' });
    this.itemId = this.itemId + 1;
    this.updateSelectAllState();
    console.log(this.items)
  }

  deleteSelected(): void {
    this.items = this.items.filter(item => !item.selected);
    this.reorderIds();
    if (this.selectedAll) {
      this.selectedAll = false;
      this.itemId = 1;
    }
  }
  updateSelectAllState(): void {
    this.selectedAll = this.items.every(item => item.selected);
  }

  reorderIds(): void {
    this.items.forEach((item, index) => {
      item.id = index + 1;
    });
  }


  onEditorReady(event: any, item: Item, editorField: 'actionEditor' | 'expectedResultEditor'): void {
    item[editorField] = event.editor;
  }

  saveTestCase() {
    this.testCaseService.setItems(this.items);
    this.testCaseService.saveTestCase();
  }
}

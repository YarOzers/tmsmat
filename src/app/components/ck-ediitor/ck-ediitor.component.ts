import { Component,ChangeDetectorRef } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  BalloonEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  BlockToolbar,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
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
  Table,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  Undo,
  type EditorConfig, Editor
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ru.js';

import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-ck-ediitor',
  standalone: true,
  imports: [
    CKEditorModule,
    NgIf
  ],
  templateUrl: './ck-ediitor.component.html',
  styleUrl: './ck-ediitor.component.css'
})
export class CkEdiitorComponent {

  protected readonly Editor = Editor;
}

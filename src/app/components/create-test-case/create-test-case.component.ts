import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {PackagesComponent} from "../packages/packages.component";
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";
import {TopMenuComponent} from "../top-menu/top-menu.component";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "../editor/editor.component";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";

@Component({
  selector: 'app-create-test-case',
  standalone: true,
  imports: [
    FlexModule,
    PackagesComponent,
    TestCaseListComponent,
    TopMenuComponent,
    QuillEditorComponent,
    FormsModule,
    QuillModule,
    EditorComponent,
    CustomToolbarComponent
  ],
  templateUrl: './create-test-case.component.html',
  styleUrl: './create-test-case.component.css'
})
export class CreateTestCaseComponent {

}

import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {PackagesComponent} from "../packages/packages.component";
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";
import {TopMenuComponent} from "../top-menu/top-menu.component";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {CustomToolbarComponent} from "../custom-toolbar/custom-toolbar.component";
import {TestCaseComponent} from "../test-case/test-case.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";

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
    CustomToolbarComponent,
    TestCaseComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './create-test-case.component.html',
  styleUrl: './create-test-case.component.css'
})
export class CreateTestCaseComponent {
  testCaseName: string | undefined;
  priority: number | undefined;
  executionTime: string | undefined;
  automationFlag: number | undefined;
}

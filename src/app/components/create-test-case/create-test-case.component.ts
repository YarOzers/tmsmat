import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {PackagesComponent} from "../packages/packages.component";
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";
import {TopMenuComponent} from "../top-menu/top-menu.component";

@Component({
  selector: 'app-create-test-case',
  standalone: true,
    imports: [
        FlexModule,
        PackagesComponent,
        TestCaseListComponent,
        TopMenuComponent
    ],
  templateUrl: './create-test-case.component.html',
  styleUrl: './create-test-case.component.css'
})
export class CreateTestCaseComponent {

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {PackagesComponent} from "./components/packages/packages.component";
import {TestCaseListComponent} from "./components/test-case-list/test-case-list.component";
import {TopMenuComponent} from "./components/top-menu/top-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlexLayoutModule, PackagesComponent, TestCaseListComponent, TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tmsmat';
}

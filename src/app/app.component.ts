import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {PackagesComponent} from "./components/packages/packages.component";
import {TestCaseListComponent} from "./components/test-case-list/test-case-list.component";
import {TopMenuComponent} from "./components/top-menu/top-menu.component";
import {SplitAreaComponent, SplitComponent} from "angular-split";
import {TestCaseTableComponent} from "./components/test-case-table/test-case-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlexLayoutModule, PackagesComponent, TestCaseListComponent, TopMenuComponent, SplitComponent, SplitAreaComponent, TestCaseTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tmsmat';
  leftColumnSize = 20;
  rightColumnSize = 80;

  onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'touch') {
      console.log('Touch event detected');
    } else {
      console.log('Non-touch event detected');
    }
  }

}

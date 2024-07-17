import {Injectable} from '@angular/core';
import {Item} from '../components/test-case/test-case.component';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private items: Item[] = [];

  constructor() {}

  setItems(items: Item[]): void {
    this.items = items;
  }

  saveTestCase(): void {
    this.items.forEach((item, index) => {
      if (item.actionEditor) {
        item.action = item.actionEditor.getData();
      }
      if (item.expectedResultEditor) {
        item.expectedResult = item.expectedResultEditor.getData();
      }
    });

    console.log(this.items); // Для проверки, что данные корректно обновлены
    // Здесь можно добавить вызов сервиса для сохранения данных, например:
    // this.http.post('/api/saveTestCase', this.items).subscribe();
  }
}

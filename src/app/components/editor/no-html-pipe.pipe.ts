import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noHtmlPipe',
  standalone: true
})
export class NoHtmlPipePipe implements PipeTransform {

  transform(value: string): string {
    let div = document.createElement('div');
    div.innerHTML = value;
    return div.innerText;
  }

}

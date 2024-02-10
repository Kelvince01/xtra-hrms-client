import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wordWrap',
  pure: true,
  standalone: true,
})
export class WordWrapPipe implements PipeTransform {
  transform(value: string, length: number): string {
    return `${value.substring(0, length)}...`;
  }
}

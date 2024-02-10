import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: true, name: 'numberWithCommas'})
export class NumberWithCommasPipe implements PipeTransform {
  transform(input: number): string {
    return new Intl.NumberFormat().format(input);
  }
}

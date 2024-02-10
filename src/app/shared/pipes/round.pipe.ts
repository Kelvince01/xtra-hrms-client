import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: true, name: 'round'})
export class RoundPipe implements PipeTransform {
  transform(input: number): number {
    return Math.round(input);
  }
}

import {Pipe, PipeTransform} from '@angular/core';
import {IEmployee} from '@data/models';

@Pipe({
  name: 'displayName',
  standalone: true,
})
export class DisplayNamePipe implements PipeTransform {
  transform(employee: IEmployee): string {
    return `${employee.firstname} ${employee.middlename!.substring(0, 1)}. ${employee.lastname}`;
  }
}

// USAGE: <h1>{{ employee | displayName }}</h1>

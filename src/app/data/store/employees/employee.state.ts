import {IEmployee} from '@data/models';

export interface EmployeeState {
  employee: IEmployee;
  employees?: IEmployee[];
}

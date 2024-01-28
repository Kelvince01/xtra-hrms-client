import {EmployeeModel} from '@data/models';

export interface EmployeeState {
  employee: EmployeeModel;
  employees?: EmployeeModel[];
}

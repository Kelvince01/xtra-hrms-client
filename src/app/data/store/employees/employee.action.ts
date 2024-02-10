import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {EmployeeListConfig} from './employee.reducer';
import {EmployeeModel} from '@data/models';

export const employeeEditActions = createActionGroup({
  source: 'Employee Edit',
  events: {
    editEmployee: emptyProps(),
    editEmployeeSuccess: emptyProps(),
  },
});

export const employeeListActions = createActionGroup({
  source: 'Employee List',
  events: {
    setListPage: props<{page: number}>(),
    setListConfig: props<{config: EmployeeListConfig}>(),
    loadEmployees: emptyProps(),
    loadEmployeesFailure: props<{error: Error}>(),
    loadEmployeesSuccess: props<{employees: EmployeeModel[]; employeesCount: number}>(),
  },
});

export const employeesActions = createActionGroup({
  source: 'Employees',
  events: {
    favorite: props<{slug: string}>(),
    favoriteFailure: props<{error: Error}>(),
    favoriteSuccess: props<{employee: EmployeeModel}>(),
    unfavorite: props<{slug: string}>(),
    unfavoriteFailure: props<{error: Error}>(),
    unfavoriteSuccess: props<{employee: EmployeeModel}>(),
  },
});

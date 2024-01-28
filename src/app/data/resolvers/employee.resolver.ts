import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {EmployeesService} from '@data/services';
import {EmployeeModel} from '@data/models';

export const employeeDetailsResolver: ResolveFn<EmployeeModel> = (
  route: ActivatedRouteSnapshot,
) => {
  const employeeService = inject(EmployeesService);
  const id = +(route.paramMap.get('id') ?? 0);
  return employeeService.getById(id);
};

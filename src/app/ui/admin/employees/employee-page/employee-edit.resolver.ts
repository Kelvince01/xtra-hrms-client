import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {of} from 'rxjs';
import {EmployeeStore} from '@stores/employees';

export const employeeEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  const employeeStore = inject(EmployeeStore);

  if (id) {
    employeeStore.getEmployee(id);
  }

  return of(true);
};

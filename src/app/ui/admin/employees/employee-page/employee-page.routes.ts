import {Routes} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {EmployeePageComponent} from './employee-page.component';
import {authGuard} from '@core/guards';
import {employeeEditResolver} from './employee-edit.resolver';
import {employeeEffects} from '../../../../data/store/employees';

export const employeePageRoutes: Routes = [
  {
    path: '',
    component: EmployeePageComponent,
    providers: [provideEffects(employeeEffects)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmployeePageComponent,
        canActivate: [authGuard],
      },
      {
        path: ':slug',
        component: EmployeePageComponent,
        resolve: {employeeEditResolver},
      },
    ],
  },
];

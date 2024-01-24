import {Routes} from "@angular/router";
import {authGuard} from "../../../core/guards/auth.guard";

export const employeesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./employee-list/employee-list.component').then(c => c.EmployeeListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./employee-page/employee-page.component').then(c => c.EmployeePageComponent)
  },
  {
    path: 'edit',
    loadChildren: () => import('./employee-page/employee-page.routes').then((c) => c.employeePageRoutes),
    canActivate: [authGuard],
  },
  // {
  //   path: 'edit/:id',
  //   loadComponent: () => import('./employee-page/employee-page.component').then(c => c.EmployeePageComponent)
  // }
]

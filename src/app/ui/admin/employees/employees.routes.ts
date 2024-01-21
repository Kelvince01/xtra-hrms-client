import {Routes} from "@angular/router";

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
    path: 'edit/:id',
    loadComponent: () => import('./employee-page/employee-page.component').then(c => c.EmployeePageComponent)
  }
]

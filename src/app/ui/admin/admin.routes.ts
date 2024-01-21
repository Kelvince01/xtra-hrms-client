import {Routes} from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./employees/employees.component').then(c => c.EmployeesComponent),
    loadChildren: () => import('./employees/employees.routes').then(r => r.employeesRoutes)
  }
]
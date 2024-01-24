import { Routes } from "@angular/router";
import {provideEffects} from "@ngrx/effects";
import {EmployeePageComponent} from "./employee-page.component";
import {authGuard} from "../../../../core/guards/auth.guard";
import {articleEditResolver} from "./employee-edit.resolver";
import { articleEffects } from "../../../../data/store/employees";

export const employeePageRoutes: Routes = [
  {
    path: '',
    component: EmployeePageComponent,
    providers: [provideEffects(articleEffects)],
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
        resolve: { articleEditResolver },
      },
    ],
  },
];

/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

export const PAYROLL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./payroll-list/payroll-list.component').then(c => c.PayrollListComponent),
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./payroll-upsert/payroll-upsert.component').then(c => c.PayrollUpsertComponent),
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./payroll-upsert/payroll-upsert.component').then(c => c.PayrollUpsertComponent),
    data: { revalidate: 60 },
  },
];

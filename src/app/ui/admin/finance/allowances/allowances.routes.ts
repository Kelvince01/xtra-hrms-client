/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { AllowanceListComponent } from '@admin-ui/finance/allowances/allowance-list/allowance-list.component';
import { AllowanceUpsertComponent } from '@admin-ui/finance/allowances/allowance-upsert/allowance-upsert.component';
import { Routes } from '@angular/router';

export const ALLOWANCE_ROUTES: Routes = [
  {
    path: '',
    component: AllowanceListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: AllowanceUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: AllowanceUpsertComponent,
    data: { revalidate: 60 }
  }
];

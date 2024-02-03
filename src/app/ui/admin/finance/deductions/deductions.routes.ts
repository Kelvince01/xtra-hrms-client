/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { DeductionListComponent } from '@admin-ui/finance/deductions/deduction-list/deduction-list.component';
import { DeductionUpsertComponent } from '@admin-ui/finance/deductions/deduction-upsert/deduction-upsert.component';
import { Routes } from '@angular/router';

export const DEDUCTION_ROUTES: Routes = [
  {
    path: '',
    component: DeductionListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: DeductionUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: DeductionUpsertComponent,
    data: { revalidate: 60 }
  }
];

/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { PayslipListComponent } from '@admin-ui/finance/payslips/payslip-list/payslip-list.component';
import { PayslipUpsertComponent } from '@admin-ui/finance/payslips/payslip-upsert/payslip-upsert.component';
import { Routes } from '@angular/router';

export const PAYSLIP_ROUTES: Routes = [
  {
    path: '',
    component: PayslipListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: PayslipUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: PayslipUpsertComponent,
    data: { revalidate: 60 },
  },
];

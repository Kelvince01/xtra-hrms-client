/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { PayrollSettingListComponent } from '@admin-ui/finance/payroll-settings/payroll-setting-list/payroll-setting-list.component';
import { PayrollSettingUpsertComponent } from '@admin-ui/finance/payroll-settings/payroll-setting-upsert/payroll-setting-upsert.component';
import { Routes } from '@angular/router';

export const PAYROLL_SETTING_ROUTES: Routes = [
  {
    path: '',
    component: PayrollSettingListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: PayrollSettingUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: PayrollSettingUpsertComponent,
    data: { revalidate: 60 }
  }
];

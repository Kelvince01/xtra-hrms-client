/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { BankListComponent } from '@admin-ui/finance/banks/bank-list/bank-list.component';
import { BankUpsertComponent } from '@admin-ui/finance/banks/bank-upsert/bank-upsert.component';
import { Routes } from '@angular/router';

export const BANK_ROUTES: Routes = [
  {
    path: '',
    component: BankListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: BankUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: BankUpsertComponent,
    data: { revalidate: 60 }
  }
];

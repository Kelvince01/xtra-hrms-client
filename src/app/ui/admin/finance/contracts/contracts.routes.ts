/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { ContractListComponent } from '@admin-ui/finance/contracts/contract-list/contract-list.component';
import { ContractUpsertComponent } from '@admin-ui/finance/contracts/contract-upsert/contract-upsert.component';
import { Routes } from '@angular/router';

export const CONTRACT_ROUTES: Routes = [
  {
    path: '',
    component: ContractListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: ContractUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: ContractUpsertComponent,
    data: { revalidate: 60 }
  }
];

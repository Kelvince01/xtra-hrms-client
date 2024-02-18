/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { FederalTaxListComponent } from '@admin-ui/finance/federal-taxes/federal-tax-list/federal-tax-list.component';
import { FederalTaxUpsertComponent } from '@admin-ui/finance/federal-taxes/federal-tax-upsert/federal-tax-upsert.component';
import { Routes } from '@angular/router';

export const FEDERAL_TAX_ROUTES: Routes = [
  {
    path: '',
    component: FederalTaxListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: FederalTaxUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: FederalTaxUpsertComponent,
    data: { revalidate: 60 },
  },
];

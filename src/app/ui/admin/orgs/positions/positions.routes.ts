/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {PositionListComponent} from '@admin-ui/orgs/positions/position-list/position-list.component';
import {PositionUpsertComponent} from '@admin-ui/orgs/positions/position-upsert/position-upsert.component';

export const POSITION_ROUTES: Routes = [
  {
    path: '',
    component: PositionListComponent,
  },
  {
    path: 'add',
    component: PositionUpsertComponent,
  },
  {
    path: 'edit/:id',
    component: PositionUpsertComponent,
  },
];

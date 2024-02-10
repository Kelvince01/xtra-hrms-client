/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {TrainingResourceListComponent} from './training-resource-list/training-resource-list.component';
import {TrainingResourceUpsertComponent} from './training-resource-upsert/training-resource-upsert.component';

export const TRAINING_RESOURCE_ROUTES: Routes = [
  {
    path: '',
    component: TrainingResourceListComponent,
  },
  {
    path: 'add',
    component: TrainingResourceUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: TrainingResourceUpsertComponent,
  },
];

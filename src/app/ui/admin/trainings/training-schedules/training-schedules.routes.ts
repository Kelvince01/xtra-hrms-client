/*
 * Copyright (c) 2024.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {TrainingScheduleUpsertComponent} from './training-schedule-upsert/training-schedule-upsert.component';
import {TrainingScheduleListComponent} from '@admin-ui/trainings/training-schedules/training-schedule-list/training-schedule-list.component';

export const TRAINING_SCHEDULE_ROUTES: Routes = [
  {
    path: '',
    component: TrainingScheduleListComponent,
  },
  {
    path: 'add',
    component: TrainingScheduleUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: TrainingScheduleUpsertComponent,
  },
];

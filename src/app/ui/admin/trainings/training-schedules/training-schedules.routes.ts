/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';
import { TrainingScheduleListComponent } from '@admin-ui/trainings/training-schedules/training-schedule-list/training-schedule-list.component';
import { TrainingScheduleUpsertComponent } from '@admin-ui/trainings/training-schedules/training-schedule-upsert/training-schedule-upsert.component';

export const TRAINING_SCHEDULE_ROUTES: Routes = [
  {
    path: '',
    component: TrainingScheduleListComponent
  },
  {
    path: 'add',
    component: TrainingScheduleUpsertComponent
  },
  {
    path: 'edit:/id',
    component: TrainingScheduleUpsertComponent
  }
];

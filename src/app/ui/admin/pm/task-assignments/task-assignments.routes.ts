/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { TaskAssignmentListComponent } from '@admin-ui/pm/task-assignments/task-assignment-list/task-assignment-list.component';
import { TaskAssignmentUpsertComponent } from '@admin-ui/pm/task-assignments/task-assignment-upsert/task-assignment-upsert.component';
import { Routes } from '@angular/router';

export const TASK_ASSIGNMENT_ROUTES: Routes = [
  {
    path: '',
    component: TaskAssignmentListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: TaskAssignmentUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: TaskAssignmentUpsertComponent,
    data: { revalidate: 60 },
  },
];

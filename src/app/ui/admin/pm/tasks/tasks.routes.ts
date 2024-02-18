/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { TaskListComponent } from '@admin-ui/pm/tasks/task-list/task-list.component';
import { TaskUpsertComponent } from '@admin-ui/pm/tasks/task-upsert/task-upsert.component';
import { Routes } from '@angular/router';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: TaskUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: TaskUpsertComponent,
    data: { revalidate: 60 },
  },
];

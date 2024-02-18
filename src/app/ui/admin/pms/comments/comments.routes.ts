/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { CommentListComponent } from '@admin-ui/pms/comments/comment-list/comment-list.component';
import { CommentUpsertComponent } from '@admin-ui/pms/comments/comment-upsert/comment-upsert.component';
import { Routes } from '@angular/router';

export const COMMENT_ROUTES: Routes = [
  {
    path: '',
    component: CommentListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: CommentUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: CommentUpsertComponent,
    data: { revalidate: 60 },
  },
];

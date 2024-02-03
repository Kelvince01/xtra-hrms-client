/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {StageNoteListComponent} from '@admin-ui/recruitments/list/stage-note-list/stage-note-list.component';
import {StageNoteUpsertComponent} from '@admin-ui/recruitments/upsert/stage-note-upsert/stage-note-upsert.component';

export const STAGE_NOTE_ROUTES: Routes = [
  {
    path: '',
    component: StageNoteListComponent,
  },
  {
    path: 'add',
    component: StageNoteUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: StageNoteUpsertComponent,
  },
];

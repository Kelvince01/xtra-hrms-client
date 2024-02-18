/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { EventDetailComponent } from '@admin-ui/organizations/events/event-detail/event-detail.component';
import { EventsComponent } from '@admin-ui/organizations/events/events.component';
import { EventUpsertComponent } from '@admin-ui/organizations/events/upsert-event/event-upsert.component';
import { Routes } from '@angular/router';

export const EVENT_ROUTES: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
  {
    path: 'add',
    component: EventUpsertComponent,
  },
  {
    path: 'edit/:id',
    component: EventUpsertComponent,
  },
  {
    path: 'view/:id',
    component: EventDetailComponent,
  },
];

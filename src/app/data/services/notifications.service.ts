/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INotification } from '@data/models/notification.model';
import { CrudService } from '@services/crud.service';

@Injectable({ providedIn: 'root' })
export class NotificationsService extends CrudService<INotification> {
  constructor(http: HttpClient) {
    super(http, 'notifications');
  }
}

@Injectable({ providedIn: 'root' })
export class NotificationsServiceV2 {
  notificationService: CrudService<INotification>;
  constructor(http: HttpClient) {
    this.notificationService = new CrudService<INotification>(http, 'notifications');
    this.notificationService.fetchEntities({ name: '' });
  }
}

/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {IBaseModel} from '@models/base.model';

export interface INotification extends IBaseModel {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title: string;
  date_time: Date;
  status: string;
  user: number;
  date_read: Date;
}

export interface INotificationV2 extends IBaseModel {
  level?: string;
  recipient?: number;
  unread?: boolean;
  actor_content_type?: number;
  actor_object_id?: string;
  actor?: number;
  verb?: string;
  description?: string;
  target_content_type?: number;
  target_object_id?: string;
  target?: number;
  action_object_content_type?: number;
  action_object_object_id?: string;
  action_object?: number;
  timestamp?: Date;
  public?: boolean;
  deleted?: boolean;
  emailed?: boolean;
  data?: string;

  verb_en?: string;
  verb_ar?: string;
  verb_de?: string;
  verb_es?: string;
  verb_fr?: string;
}

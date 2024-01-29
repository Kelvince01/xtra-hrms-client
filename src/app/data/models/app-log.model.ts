/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {BaseModel} from '@models/base.model';
import {LogLevel} from '@data/types/logger.type';

export interface IAppLog extends BaseModel {
  message: string;
  source: string;
  action?: string;
  name: string;
  description: unknown;
  // type: string | LogLevel;
  type: LogLevel;
  is_read?: boolean;
}

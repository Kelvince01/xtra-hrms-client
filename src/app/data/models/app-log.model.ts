/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {IBaseModel} from '@models/base.model';
import {LogLevel} from '@data/types/logger.type';

export interface IAppLog extends IBaseModel {
  message: string;
  source: string;
  action?: string;
  name: string;
  description: unknown;
  // type: string | LogLevel;
  type: LogLevel;
  is_read?: boolean;
}

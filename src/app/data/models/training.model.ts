/*
 * Copyright (c) 2023. Kelvince Phillips
 */

import {BaseModel} from '@models/base.model';

export interface ITraining extends BaseModel {
  employee?: number;
  training_name?: string;
  description?: string;
  date?: Date;
}

export interface ITrainingSchedule extends BaseModel {
  programme?: string;
  duration?: number;
  venue?: string;
  purpose?: string;
  date?: Date;
}

export interface ITrainingResource extends BaseModel {
  name?: string;
  producer?: string;
  file_format?: string;
  year_published?: number;
  department?: number;
  description?: string;
  file?: any;
}

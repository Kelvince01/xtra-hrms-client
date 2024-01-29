/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Injectable} from '@angular/core';
import {ITraining, ITrainingResource, ITrainingSchedule} from '@models/training.model';
import {BaseService} from '@services/base.service';

@Injectable()
export class TrainingsService extends BaseService<ITraining> {
  collectionName = 'trainings';
}

@Injectable()
export class TrainingSchedulesService extends BaseService<ITrainingSchedule> {
  collectionName = 'training-schedules';
}

@Injectable()
export class TrainingResourcesService extends BaseService<ITrainingResource> {
  collectionName = 'training-resources';
}

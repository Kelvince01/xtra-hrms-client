/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Injectable } from '@angular/core';
import {
  ICandidateStage,
  ICandidateTask,
  IOnboardingPortal,
  IOnboardingStage,
  IOnboardingTask
} from '@models/onboarding.model';
import {BaseService} from './base.service';

@Injectable()
export class OnboardingStagesService extends BaseService<IOnboardingStage> {
  override collectionName = 'onboarding-stages';
}

@Injectable()
export class CandidateStagesService extends BaseService<ICandidateStage> {
  override collectionName = 'candidate-stages';
}

@Injectable()
export class OnboardingTasksService extends BaseService<IOnboardingTask> {
  override collectionName = 'onboarding-tasks';
}

@Injectable()
export class CandidateTasksService extends BaseService<ICandidateTask> {
  override collectionName = 'candidate-tasks';
}

@Injectable()
export class OnboardingPortalsService extends BaseService<IOnboardingPortal> {
  override collectionName = 'onboarding-portals';
}

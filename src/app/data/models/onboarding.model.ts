/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {IBaseModel} from '@models/base.model';

export interface IOnboardingStage extends IBaseModel {
  stage_title?: string;
  recruitment?: number[];
  employee?: number[];
  sequence?: number;
  is_final_stage?: boolean;
}

export interface ICandidateStage extends IBaseModel {
  candidate?: number;
  onboarding_stage?: number;
  onboarding_end_date?: Date;
  sequence?: number;
}

export interface IOnboardingTask extends IBaseModel {
  task_title?: string;
  recruitment?: number[];
  employee?: number[];
}

export interface ICandidateTask extends IBaseModel {
  candidate?: number;
  status?: string;
  onboarding_task?: number;
}

export interface IOnboardingPortal extends IBaseModel {
  candidate?: number;
  token?: string;
  used?: boolean;
  count?: number;
}

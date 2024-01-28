/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {BaseModel} from '@models/base.model';

export interface IOnboardingStage extends BaseModel {
  stage_title?: string;
  recruitment?: number[];
  employee?: number[];
  sequence?: number;
  is_final_stage?: boolean;
}

export interface ICandidateStage extends BaseModel {
  candidate?: number;
  onboarding_stage?: number;
  onboarding_end_date?: Date;
  sequence?: number;
}

export interface IOnboardingTask extends BaseModel {
  task_title?: string;
  recruitment?: number[];
  employee?: number[];
}

export interface ICandidateTask extends BaseModel {
  candidate?: number;
  status?: string;
  onboarding_task?: number;
}

export interface IOnboardingPortal extends BaseModel {
  candidate?: number;
  token?: string;
  used?: boolean;
  count?: number;
}

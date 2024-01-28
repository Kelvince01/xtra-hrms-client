/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {BaseModel} from '@models/base.model';
import {IJobPosition, IOrganizationInfo} from '@models/organizations.model';
import {IEmployeeInfo} from '@models/employee.model';

export interface IRecruitment extends BaseModel {
  title: string;
  description: string;
  is_event_based: boolean;
  closed: boolean;
  is_active: boolean;
  open_positions?: IJobPosition[];
  job_position?: IJobPosition;
  vacancy?: number;
  recruitment_managers?: IEmployeeInfo[];
  organization?: IOrganizationInfo;
  start_date: Date;
  end_date?: Date;
}

export interface IRecruitmentList extends BaseModel {
  title: string;
  description: string;
  is_event_based: boolean;
  closed: boolean;
  is_active: boolean;
  open_positions?: IJobPosition[];
  job_position?: IJobPosition;
  vacancy?: number;
  recruitment_managers?: IEmployeeInfo[];
  organization?: IOrganizationInfo;
  start_date: Date;
  end_date?: Date;
}

export interface IStage extends BaseModel {
  recruitment: number;
  stage_managers: number[];
  stage: string;
  stage_type: string;
  sequence: number;
  is_active: boolean;
}

export interface ICandidate extends BaseModel {
  offerAccepted: boolean;
  status: string;
  lastName: string;
  position: string;
  firstName: string;
  level: string;

  name?: string;
  profile?: any;
  portfolio?: string;
  recruitment?: number;
  job_position?: number;
  stage?: number;
  schedule_date?: Date;
  email?: string;
  mobile?: string;
  resume?: any;
  referral?: number;
  address?: string;
  country?: string;
  dob?: Date;
  state?: string;
  city?: string;
  zip?: string;
  gender?: string;
  start_onboard?: boolean;
  hired?: boolean;
  canceled?: boolean;
  is_active?: boolean;
  joining_date?: Date;
  history?: any;
  sequence?: number;
}

export interface IStageNote extends BaseModel {
  candidate_id?: number;
  title?: string;
  description?: string;
  stage_id?: number;
}

export interface IRecruitmentSurvey extends BaseModel {
  question?: string;
  recruitments?: number[];
  job_positions?: number[];
  sequence?: number;
  options?: string;
  is_mandatory?: boolean;
}

export interface IRecruitmentSurveyAnswer extends BaseModel {
  candidate?: number;
  recruitment?: number;
  job_position?: number;
  answer_json?: string;
  attachment?: any;
}

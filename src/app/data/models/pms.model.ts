/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {IBaseModel} from '@models/base.model';

export interface IPerformance extends IBaseModel {
  employee?: number;
  performance_rating?: number;
  evaluation_date?: Date;
  comments?: string;
}

export interface IWorkProductivityDataset extends IBaseModel {
  w_pds?: string;
  w_type?: string;
  o_id?: number;
}

export interface IPeriod extends IBaseModel {
  period_name?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface IEmployeeObjective extends IBaseModel {
  objective?: string;
  objective_description?: string;
  employee?: number;
  start_date?: Date;
  end_date?: Date;
  status?: string;
  archive?: boolean;
}

export interface IComment extends IBaseModel {
  comment?: string;
  employee?: number;
  employee_objective?: number;
}

export interface IEmployeeKeyResult extends IBaseModel {
  key_result?: string;
  key_result_description?: string;
  employee_objective?: number;
  employee?: number;
  progress_type?: string;
  status?: string;
  start_value?: number;
  current_value?: number;
  target_value?: number;
  start_date?: Date;
  end_date?: Date;
}

export interface IQuestionTemplate extends IBaseModel {
  question_template?: string;
}

export interface IQuestion extends IBaseModel {
  question?: string;
  question_type?: string;
  template?: number;
}

export interface IQuestionOption extends IBaseModel {
  question?: number;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
}

export interface IFeedback extends IBaseModel {
  review_cycle?: string;
  manager?: number;
  employee?: number;
  colleague?: number[];
  subordinate?: number[];
  question_template?: number;
  status?: string;
  archive?: boolean;
  start_date?: Date;
  end_date?: Date;
  employee_key_results_id?: number[];
}

export interface IAnswer extends IBaseModel {
  answer?: string;
  question?: number;
  employee?: number;
  feedback?: number;
}

export interface IKeyResultFeedback extends IBaseModel {
  feedback?: number;
  employee?: number;
  answer?: string;
  key_result?: number;
}

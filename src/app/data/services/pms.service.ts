/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Injectable} from '@angular/core';
import {
  IAnswer,
  IComment,
  IEmployeeKeyResult,
  IEmployeeObjective,
  IFeedback,
  IKeyResultFeedback,
  IPerformance,
  IPeriod,
  IQuestion,
  IQuestionOption,
  IQuestionTemplate,
  IWorkProductivityDataset,
} from '@models/pms.model';
import {BaseService} from './base.service';

@Injectable()
export class PerformancesService extends BaseService<IPerformance> {
  override collectionName = 'performances';
}

@Injectable()
export class WorkProductivityDatasetsService extends BaseService<IWorkProductivityDataset> {
  override collectionName = 'work-productivity-datasets';
}

@Injectable()
export class PeriodsService extends BaseService<IPeriod> {
  override collectionName = 'periods';
}

@Injectable()
export class EmployeeObjectivesService extends BaseService<IEmployeeObjective> {
  override collectionName = 'employee-objectives';
}

@Injectable()
export class CommentsService extends BaseService<IComment> {
  override collectionName = 'comments';
}

@Injectable()
export class EmployeeKeyResultsService extends BaseService<IEmployeeKeyResult> {
  override collectionName = 'employee-key-results';
}

@Injectable()
export class QuestionTemplatesService extends BaseService<IQuestionTemplate> {
  override collectionName = 'question-templates';
}

@Injectable()
export class QuestionsService extends BaseService<IQuestion> {
  override collectionName = 'questions';
}

@Injectable()
export class QuestionOptionsService extends BaseService<IQuestionOption> {
  override collectionName = 'question-options';
}

@Injectable()
export class FeedbacksService extends BaseService<IFeedback> {
  override collectionName = 'feedbacks';
}

@Injectable()
export class AnswersService extends BaseService<IAnswer> {
  override collectionName = 'answers';
}

@Injectable()
export class KeyResultFeedbacksService extends BaseService<IKeyResultFeedback> {
  override collectionName = 'key-result-feedbacks';
}

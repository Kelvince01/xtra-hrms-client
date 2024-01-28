/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {inject, Injectable} from '@angular/core';
import {
  ICandidate,
  IRecruitment,
  IRecruitmentSurvey,
  IRecruitmentSurveyAnswer,
  IStage,
  IStageNote,
} from '@models/recruitments.model';
import {BaseService} from './base.service';
import {Observable, of} from 'rxjs';
import {RecruitmentListConfig} from '@stores/recruitments';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class RecruitmentsService extends BaseService<IRecruitment> {
  override collectionName = 'recruitments';
  #http = inject(HttpClient);

  query(
    config: RecruitmentListConfig,
  ): Observable<{recruitments: IRecruitment[]; recruitmentsCount: number}> {
    return this.#http.get<any>('/articles' + (config.type === 'FEED' ? '/feed' : ''), {
      responseType: 'json',
      params: this.toHttpParams(config.filters),
    });
  }

  private toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams(),
    );
  }
}

@Injectable()
export class StagesService extends BaseService<IStage> {
  override collectionName = 'stages';
}

@Injectable()
export class CandidatesService extends BaseService<ICandidate> {
  override collectionName = 'candidates';

  getCandidatesByName(value: string) {
    return of();
  }
}

@Injectable()
export class StageNotesService extends BaseService<IStageNote> {
  override collectionName = 'stage-notes';
}

@Injectable()
export class RecruitmentSurveysService extends BaseService<IRecruitmentSurvey> {
  override collectionName = 'recruitment-surveys';
}

@Injectable()
export class RecruitmentSurveyAnswersService extends BaseService<IRecruitmentSurveyAnswer> {
  override collectionName = 'recruitment-survey-answers';
}

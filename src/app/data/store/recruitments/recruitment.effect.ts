import {inject} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {recruitmentListActions} from './recruitment.action';
import {catchError, concatMap, map, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {recruitmentListQuery} from './recruitment.selector';
import {RecruitmentsService} from '@services/recruitments.service';

export const setListPage$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(recruitmentListActions.setListPage),
      map(() => recruitmentListActions.loadRecruitments()),
    );
  },
  {functional: true},
);

export const setListTag$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(recruitmentListActions.setListConfig),
      map(() => recruitmentListActions.loadRecruitments()),
    );
  },
  {functional: true},
);

export const loadRecruitments$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    recruitmentsService = inject(RecruitmentsService),
  ) => {
    return actions$.pipe(
      ofType(recruitmentListActions.loadRecruitments),
      concatLatestFrom(() => store.select(recruitmentListQuery.selectListConfig)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      concatMap(([_, config]) =>
        recruitmentsService.query(config).pipe(
          map((results: any) =>
            recruitmentListActions.loadRecruitmentsSuccess({
              recruitments: results.recruitments,
              recruitmentsCount: results.recruitmentsCount,
            }),
          ),
          catchError((error) => of(recruitmentListActions.loadRecruitmentsFailure({error}))),
        ),
      ),
    );
  },
  {functional: true},
);

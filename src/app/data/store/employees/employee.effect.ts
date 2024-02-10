import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, concatMap, map, of, tap} from 'rxjs';
import {ngrxFormsQuery} from '../forms/forms.selectors';
import {formsActions} from '../forms/forms.actions';
import {employeeEditActions, employeeListActions, employeesActions} from './employee.action';
import {employeeListQuery} from './employee.selector';
import {EmployeesService} from '../../services/employees.service';

/*export const publishEmployee$ = createEffect(
  (
    actions$ = inject(Actions),
    employeesService = inject(EmployeesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(employeeEditActions.publishEmployee),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) =>
        employeesService.publishEmployee(data).pipe(
          tap((result) => router.navigate(['employee', result.employee.slug])),
          map(() => employeeEditActions.publishEmployeeSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    );
  },
  { functional: true },
);*/

export const setListPage$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(employeeListActions.setListPage),
      map(() => employeeListActions.loadEmployees()),
    );
  },
  {functional: true},
);

export const setListTag$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(employeeListActions.setListConfig),
      map(() => employeeListActions.loadEmployees()),
    );
  },
  {functional: true},
);

/*export const loadEmployees$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), employeesService = inject(EmployeesService)) => {
    return actions$.pipe(
      ofType(employeeListActions.loadEmployees),
      concatLatestFrom(() => store.select(employeeListQuery.selectListConfig)),
      concatMap(([_, config]) =>
        employeesService.query(config).pipe(
          map((results) =>
            employeeListActions.loadEmployeesSuccess({
              employees: results.employees,
              employeesCount: results.employeesCount,
            }),
          ),
          catchError((error) => of(employeeListActions.loadEmployeesFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const favorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(employeesActions.favorite),
      concatMap(({ slug }) =>
        actionsService.favorite(slug).pipe(
          map((response) => employeesActions.favoriteSuccess({ employee: response.employee })),
          catchError((error) => of(employeesActions.favoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unFavorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(employeesActions.unfavorite),
      concatMap(({ slug }) =>
        actionsService.unfavorite(slug).pipe(
          map((response) => employeesActions.unfavoriteSuccess({ employee: response.employee })),
          catchError((error) => of(employeesActions.unfavoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);*/

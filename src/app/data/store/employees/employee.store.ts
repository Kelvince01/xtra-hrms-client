import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import {EmployeesService} from "../../services/employees.service";
import { EmployeeState } from './employee.state';
import {setLoaded, setLoading, withCallState} from "../call-state.feature";
import {ngrxFormsQuery} from "../forms/forms.selectors";
import {formsActions} from "../forms/forms.actions";
import {EmployeeModel} from "../../models/employee.model";

export const employeeInitialState: EmployeeState = {
  employee: {
    firstname: '',
    surname: '',
    date_of_birth: new Date(),
    gender: '',
    marital_status: '',
    email: ''
  }
};

export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withState<EmployeeState>(employeeInitialState),
  withMethods(
    (
      store,
      articlesService = inject(EmployeesService),
      // actionsService = inject(ActionsService),
      router = inject(Router),
      reduxStore = inject(Store),
    ) => ({
      getArticle: rxMethod<number>(
        pipe(
          tap(() => setLoading('getEmployee')),
          switchMap((id) =>
            articlesService.getById(id).pipe(
              tapResponse({
                next: (employee) => {
                  patchState(store, { employee: employee, ...setLoaded('getEmployee') });
                },
                error: () => {
                  patchState(store, { employee: employeeInitialState.employee, ...setLoaded('getEmployee') });
                },
              }),
            ),
          ),
        ),
      ),
      getEmployees: rxMethod<EmployeeModel[]>(
        pipe(
          tap(() => setLoading('getEmployees')),
          switchMap(() =>
            articlesService.get().pipe(
              tapResponse({
                next: (employees) => {
                  patchState(store, { employees: employees });
                  setLoaded('getEmployees');
                },
                error: () => {
                  patchState(store, { employee: employeeInitialState.employee });
                  setLoaded('getEmployees');
                },
              }),
            ),
          ),
        ),
      ),
      deleteArticle: rxMethod<number>(
        pipe(
          switchMap((id) =>
            articlesService.delete(id).pipe(
              tapResponse({
                next: () => router.navigate(['/']),
                error: () => patchState(store, employeeInitialState),
              }),
            ),
          ),
        ),
      ),
      addEmployee: rxMethod<EmployeeModel>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          switchMap(([employee]) =>
            articlesService.create(employee).pipe(
              tapResponse({
                // next: () => patchState(store, { data: [data.comment, ...store.comments()] }),
                next: () => patchState(store, { employee }),
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      initializeArticle: () => {
        patchState(store, employeeInitialState);
      },
    }),
  ),
  withCallState({ collection: 'getEmployee' }),
);

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '@data/models';
import { EmployeesService } from '@data/services';
import { concatLatestFrom } from '@ngrx/effects';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { formsActions, ngrxFormsQuery } from '@stores/forms';
import { pipe, switchMap, tap } from 'rxjs';
import { setLoaded, setLoading, withCallState } from '../call-state.feature';
import { EmployeeState } from './employee.state';

export const employeeInitialState: EmployeeState = {
  employee: {
    firstname: '',
    lastname: '',
    date_of_birth: new Date(),
    gender: '',
    marital_status: '',
    email: '',
  },
};

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState<EmployeeState>(employeeInitialState),
  withMethods(
    (
      store,
      employeesService = inject(EmployeesService),
      // actionsService = inject(ActionsService),
      router = inject(Router),
      reduxStore = inject(Store),
    ) => ({
      getEmployee: rxMethod<number>(
        pipe(
          tap(() => setLoading('getEmployee')),
          switchMap(id =>
            employeesService.getById(id).pipe(
              tapResponse({
                next: employee => {
                  patchState(store, { employee: employee, ...setLoaded('getEmployee') });
                },
                error: () => {
                  patchState(store, {
                    employee: employeeInitialState.employee,
                    ...setLoaded('getEmployee'),
                  });
                },
              }),
            ),
          ),
        ),
      ),
      getEmployees: rxMethod<void>(
        pipe(
          tap(() => setLoading('getEmployees')),
          switchMap(() =>
            employeesService.get().pipe(
              tapResponse({
                next: employees => {
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
      deleteEmployee: rxMethod<number>(
        pipe(
          switchMap(id =>
            employeesService.delete(id).pipe(
              tapResponse({
                next: () => router.navigate(['/']),
                error: () => patchState(store, employeeInitialState),
              }),
            ),
          ),
        ),
      ),
      addEmployee: rxMethod<IEmployee>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          switchMap(([employee]) =>
            employeesService.create(employee).pipe(
              tapResponse({
                // next: () => patchState(store, { data: [data.comment, ...store.comments()] }),
                next: () => patchState(store, { employee }),
                error: ({ error }) =>
                  reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      initializeEmployee: () => {
        patchState(store, employeeInitialState);
      },
    }),
  ),
  withCallState({ collection: 'getEmployee' }),
);

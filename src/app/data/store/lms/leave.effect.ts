/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {Store, select} from '@ngrx/store';
import {EMPTY, catchError, concatMap, map, of, tap} from 'rxjs';
import {LeavesActions} from '@stores/lms/leave.action';
import {LeavesService} from '@services/lms.service';
import {NotificationService} from '@services/notifications/notification.service';
import {getAllLeaves, getNextLeaveIndex} from '@stores/lms/leave.selector';
import {selectIdParam, selectQueryParams} from '@stores/router.selectors';
import {selectIsLoggedIn, selectUserSubject} from '@stores/auth/v2/auth.selectors';
import {AuthActions} from '@stores/auth/v2/auth.actions';

export const updateRoute = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(LeavesActions.selectLeave),
      tap(({id}) => {
        router.navigate(['/lms'], {
          queryParams: {leaveId: id},
        });
      }),
    );
  },
  {functional: true, dispatch: false},
);

export const selectNextLeave = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(LeavesActions.selectNextLeave),
      concatLatestFrom(() => [
        store.pipe(select(getAllLeaves)),
        store.pipe(select(getNextLeaveIndex)),
      ]),
      map(([_action, allLeaves, nextLeaveIndex]) => {
        const newSelectedLeave = allLeaves[nextLeaveIndex];

        return LeavesActions.selectLeave({id: newSelectedLeave.id!});
      }),
    );
  },
  {functional: true},
);

export const loadLeaves = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    leavesService = inject(LeavesService),
    notificationService = inject(NotificationService),
  ) => {
    return actions$.pipe(
      ofType(LeavesActions.loadLeaves),
      concatLatestFrom(() => store.select(selectQueryParams)),
      concatMap(([_action, {leaveId}]) => {
        return leavesService.get().pipe(
          concatMap((leaves) => {
            const currentLeaveId = leaveId || leaves[0]?.id || '-1';

            notificationService.showSuccess('Leaves Loaded');

            return [
              LeavesActions.loadLeavesFinished({leaves}),
              LeavesActions.selectLeave({id: currentLeaveId}),
            ];
          }),
          catchError(() => {
            notificationService.showError();

            return of(LeavesActions.loadLeavesError());
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const loadMyLeavesInitially = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(LeavesActions.loadLeavesFinished),
      concatLatestFrom(() => store.select(selectIsLoggedIn)),
      concatMap(([_, isLoggedIn]) => {
        if (isLoggedIn) {
          return [LeavesActions.loadMyLeaves()];
        }

        return EMPTY;
      }),
    );
  },
  {functional: true},
);

export const loadMyLeaves = createEffect(
  (actions$ = inject(Actions), store = inject(Store), leavesService = inject(LeavesService)) => {
    return actions$.pipe(
      ofType(LeavesActions.loadMyLeaves, AuthActions.loginComplete),
      concatLatestFrom(() => store.select(selectUserSubject)),
      concatMap(() => {
        return leavesService
          .get()
          .pipe(map((leaves) => LeavesActions.loadMyLeavesFinished({leaves})));
      }),
    );
  },
  {functional: true},
);

export const loadMaddLeaveWithPictureLeaves = createEffect(
  (
    actions$ = inject(Actions),
    // uploadService = inject(UploadService),
    leavesService = inject(LeavesService),
  ) => {
    return actions$.pipe(
      ofType(LeavesActions.addLeaveWithPicture),
      // concatMap(({name, breed, comment, formData}) => {
      //   return uploadService.upload(formData).pipe(
      //     map(({path}) => {
      //       return {name, breed, comment, path};
      //     }),
      //   );
      // }),
      concatMap(({leave}) => {
        return leavesService.create(leave).pipe(
          map((leave) => {
            return LeavesActions.addLeaveFinished({leave});
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const addLeaveFinished = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    notificationService = inject(NotificationService),
  ) => {
    return actions$.pipe(
      ofType(LeavesActions.addLeaveFinished),
      tap(({leave}) => {
        notificationService.showSuccess(`Leave ${leave.id} added`);

        router.navigate(['/lms/my']);
      }),
    );
  },
  {functional: true, dispatch: false},
);
export const deleteLeave = createEffect(
  (
    actions$ = inject(Actions),
    leavesService = inject(LeavesService),
    notificationService = inject(NotificationService),
  ) => {
    return actions$.pipe(
      ofType(LeavesActions.deleteLeave),
      concatMap(({leave}) => {
        return leavesService.delete(leave.id!).pipe(
          map((leave) => {
            notificationService.showSuccess('Leave deleted');

            return LeavesActions.deleteLeaveFinished({id: leave.id!});
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const addLeaveRealtimeFinished = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(LeavesActions.addLeaveRealtimeFinished),
      concatLatestFrom(() => store.select(selectUserSubject)),
      concatMap(([{leave}, userSub]) => {
        // const {userId} = leave;
        const {employee} = leave;
        const isMyLeave = employee === userSub;

        if (isMyLeave) {
          return [
            LeavesActions.addLeaveToAllLeaves({
              leave,
            }),
            LeavesActions.addLeaveToMyLeaves({
              leave,
            }),
          ];
        }

        return [
          LeavesActions.addLeaveToAllLeaves({
            leave,
          }),
        ];
      }),
    );
  },
  {functional: true},
);

export const loadSingleLeave = createEffect(
  (actions$ = inject(Actions), store = inject(Store), leavesService = inject(LeavesService)) => {
    return actions$.pipe(
      ofType(LeavesActions.loadSingleLeave),
      concatLatestFrom(() => store.select(selectIdParam)),
      concatMap(([_action, id]) => {
        return leavesService.getById(Number(id)).pipe(
          map((leave) => LeavesActions.loadSingleLeaveFinished({leave})),
          catchError(() => of(LeavesActions.loadSingleLeaveError())),
        );
      }),
    );
  },
  {functional: true},
);

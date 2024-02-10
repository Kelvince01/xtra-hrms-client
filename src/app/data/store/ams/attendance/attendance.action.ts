/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createAction, props} from '@ngrx/store';
import {IAttendance} from '@models/attendance.model';

export const addAttendance = createAction(
  '[Attendance] Add Attendance',
  props<{email: string; password: string}>(),
);

export const addAttendanceSuccess = createAction(
  '[Attendance] Add Attendance Success',
  props<{token: string}>(),
);

export const addAttendanceFailure = createAction(
  '[Attendance] Add Attendance Failure',
  props<{error: string}>(),
);

export const setAttendance = createAction(
  '[Attendance] Set Attendance',
  props<{attendance: IAttendance}>(),
);

export const deleteAttendance = createAction('[Attendance] Delete Attendance');

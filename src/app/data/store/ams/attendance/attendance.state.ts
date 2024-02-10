/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {IAttendance} from '@models/attendance.model';

export interface AttendanceState {
  // error message
  error: string;
  // is a user authenticated?
  isLoading: boolean;
  // if authenticated, there should be a user object
  attendance: IAttendance;
}

export const initialAttendanceValue: IAttendance = {};

export const attendanceInitialState: AttendanceState = {
  error: '',
  isLoading: false,
  attendance: initialAttendanceValue,
};

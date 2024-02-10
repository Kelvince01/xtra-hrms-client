import {createReducer, on} from '@ngrx/store';
import {attendanceInitialState, AttendanceState} from './attendance.state';
import {
  addAttendance,
  addAttendanceFailure,
  addAttendanceSuccess,
  deleteAttendance,
  setAttendance,
} from '@stores/ams/attendance/attendance.action';

export const attendanceReducer = createReducer(
  attendanceInitialState,
  on(addAttendance, (state) => ({...state, isLoading: true})),
  on(addAttendanceSuccess, (state, {token}) => ({...state, token, isLoading: false})),
  on(addAttendanceFailure, (state, {error}) => ({...state, error, isLoading: false})),
  on(deleteAttendance, (state): AttendanceState => ({...state})),
  on(setAttendance, (state, {attendance}): AttendanceState => ({...state, attendance})),
);

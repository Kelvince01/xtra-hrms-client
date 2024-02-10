import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AttendanceState} from './attendance.state';

export const attendanceFeature = createFeatureSelector<AttendanceState>('attendance');

export const selectError = createSelector(attendanceFeature, (state) => state.error);

export const selectIsLoading = createSelector(attendanceFeature, (state) => state.isLoading);

export const selectAttendanceData = createSelector(attendanceFeature, (state) => state.attendance);

/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LeaveState, featureName} from './leave.state';
import {ILeave} from '@models/lms.model';

const getLeaveState = createFeatureSelector<LeaveState>(featureName);

export const getAllLeaves = createSelector(getLeaveState, (state: LeaveState) => state.leaves);

export const getMyLeaves = createSelector(
  getLeaveState,
  (state: LeaveState) => state?.myLeaves || [],
);

export const getAllIdsOfMyLeaves = createSelector(getMyLeaves, (myLeaves: ILeave[]) => {
  if (myLeaves.length === 0) {
    return [];
  }

  return myLeaves.map((x) => x.id);
});

export const getLoading = createSelector(getLeaveState, (state: LeaveState) => state.loading);

export const getSelectedLeave = createSelector(
  getLeaveState,
  (state: LeaveState) => state.selectedLeave!,
);

export const getDetailLeave = createSelector(
  getLeaveState,
  (state: LeaveState) => state.detailLeave,
);

export const getSelectedLeaveIndex = createSelector(
  getAllLeaves,
  getSelectedLeave,
  (allLeaves: ILeave[], selectedLeave: ILeave) => {
    return allLeaves.findIndex((leave) => leave.id === selectedLeave.id)!;
  },
);

export const getNextLeaveIndex = createSelector(
  getAllLeaves,
  getSelectedLeaveIndex,
  (allLeaves: ILeave[], currentLeaveIndex: number) => {
    return (currentLeaveIndex + 1) % allLeaves.length;
  },
);

export const getAllLeavesButSelected = createSelector(
  getAllLeaves,
  getSelectedLeave,
  (allLeaves: ILeave[], selectedLeave: ILeave) => {
    if (allLeaves.length === 0) {
      return [];
    }

    if (!selectedLeave) {
      return allLeaves;
    }

    return allLeaves.filter((Leave) => Leave.id !== selectedLeave.id);
  },
);

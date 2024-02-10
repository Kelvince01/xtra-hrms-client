/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createReducer, on} from '@ngrx/store';
import {leaveInitialState, LeaveState} from './leave.state';
import {LeavesActions} from '@stores/lms/leave.action';
import {ILeave} from '@models/lms.model';

export const leavesReducer = createReducer<LeaveState>(
  leaveInitialState,

  on(LeavesActions.loadLeavesFinished, (state, {leaves}) => {
    return {
      ...state,
      loading: false,
      leaves,
    };
  }),

  on(LeavesActions.addLeaveToAllLeaves, LeavesActions.addLeaveFinished, (state, {leave}) => {
    return {
      ...state,
      leaves: [...state.leaves, leave],
      loading: false,
    };
  }),

  on(LeavesActions.addLeaveToMyLeaves, (state, {leave}) => {
    return {
      ...state,
      myLeaves: [...state.myLeaves, leave],
    };
  }),

  on(LeavesActions.loadMyLeavesFinished, (state, {leaves}) => {
    return {
      ...state,
      loading: false,
      myLeaves: leaves,
    };
  }),

  on(
    LeavesActions.addLeaveWithPicture,
    LeavesActions.loadLeaves,
    LeavesActions.loadSingleLeave,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    },
  ),

  on(LeavesActions.loadSingleLeaveFinished, (state, {leave}) => {
    return {
      ...state,
      detailLeave: leave,
      loading: false,
    };
  }),

  on(LeavesActions.clearSingleLeave, (state) => {
    return {
      ...state,
      detailLeave: null,
    };
  }),

  on(LeavesActions.selectLeave, (state, {id}) => {
    const selectedLeave = state.leaves.find((leave) => leave.id === id)!;

    return {
      ...state,
      selectedLeave,
    };
  }),

  on(
    LeavesActions.deleteLeaveFinished,
    LeavesActions.deleteLeaveRealtimeFinished,
    (state, {id}) => {
      const leaves = removeItemFromArray(state.leaves, id);
      const myLeaves = removeItemFromArray(state.myLeaves, id);

      if (state.selectedLeave?.id === id) {
        const currentIndex = state.leaves.findIndex((leave) => leave.id === id);
        const nextIndex = (currentIndex + 1) % state.leaves.length;
        const selectedLeave = state.leaves[nextIndex];

        return {
          ...state,
          leaves,
          myLeaves,
          selectedLeave,
        };
      }

      return {
        ...state,
        myLeaves,
        leaves,
      };
    },
  ),
);

function replaceItemInArray(array: ILeave[], newItem: ILeave): ILeave[] {
  const currentLeaveIndex = array.findIndex((x) => x.id === newItem.id);
  const allLeavesCopy = [...array];
  allLeavesCopy.splice(currentLeaveIndex, 1, newItem);

  return allLeavesCopy;
}

function removeItemFromArray(array: ILeave[], id: number): ILeave[] {
  return [...array].filter((existing) => existing.id! !== id);
}

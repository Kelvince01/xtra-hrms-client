/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {ILeave} from '@models/lms.model';

export const featureName = 'leaves';

export interface LeaveState {
  leaves: ILeave[];
  myLeaves: ILeave[];
  selectedLeave: ILeave | null;
  detailLeave: ILeave | null;
  loading: boolean;
}

export const leaveInitialState: LeaveState = {
  leaves: [],
  myLeaves: [],
  selectedLeave: null,
  detailLeave: null,
  loading: false,
};

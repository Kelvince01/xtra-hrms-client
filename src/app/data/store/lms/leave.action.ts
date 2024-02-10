/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ILeave} from '@models/lms.model';

export const LeavesActions = createActionGroup({
  source: 'Leaves',
  events: {
    'Load Leaves': emptyProps(),
    'Load Leaves Finished': props<{leaves: ILeave[]}>(),
    'Load Leaves Error': emptyProps(),

    'Load Single Leave': emptyProps(),
    'Load Single Leave Finished': props<{leave: ILeave}>(),
    'Load Single Leave Error': emptyProps(),
    'Clear Single Leave': emptyProps(),

    'Load My Leaves': emptyProps(),
    'Load My Leaves Finished': props<{leaves: ILeave[]}>(),
    'Load My Leaves Error': emptyProps(),

    'Select Next Leave': emptyProps(),
    'Select Leave': props<{id: number}>(),

    'Add Leave With Picture': props<{leave: ILeave}>(),
    'Add Leave Finished': props<{leave: ILeave}>(),
    'Add Leave Realtime Finished': props<{leave: ILeave}>(),
    'Add Leave To My Leaves': props<{leave: ILeave}>(),
    'Add Leave To All Leaves': props<{leave: ILeave}>(),

    'Navigate To Last Added Leave': props<{id: number}>(),
    'Delete Leave': props<{leave: ILeave}>(),
    'Delete Leave Finished': props<{id: number}>(),
    'Delete Leave Realtime Finished': props<{id: number}>(),
  },
});

import {Routes} from '@angular/router';
import {ATTENDANCE_ACTIVITY_ROUTES} from '@admin-ui/ams/activities/attendance-activities.routes';
import {EMPLOYEE_SHIFT_SCHEDULE_ROUTES} from '@admin-ui/ams/employee-shift-schedules/attendance-shift-schedules.routes';
import {EMPLOYEE_SHIFT_ROUTES} from '@admin-ui/ams/employee-shifts/attendance-shifts.routes';
import {ATTENDANCE_LATE_COME_EARLY_OUT_ROUTES} from '@admin-ui/ams/late-come-early-outs/attendance-late-come-early-outs.routes';
import {OVERTIME_ROUTES} from '@admin-ui/ams/overtimes/overtimes.routes';
import {ATTENDANCE_VALIDATION_CONDITION_ROUTES} from '@admin-ui/ams/validation-conditions/attendance-validation-conditions.routes';

export const amsRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@admin-ui/ams/attendance/attendance.routes').then((r) => r.ATTENDANCE_ROUTES),
    data: {revalidate: 60},
  },
  {
    path: 'activities',
    children: ATTENDANCE_ACTIVITY_ROUTES,
  },
  {
    path: 'employee-shift-schedules',
    children: EMPLOYEE_SHIFT_SCHEDULE_ROUTES,
  },
  {
    path: 'employee-shifts',
    children: EMPLOYEE_SHIFT_ROUTES,
  },
  {
    path: 'late-come-early-outs',
    children: ATTENDANCE_LATE_COME_EARLY_OUT_ROUTES,
  },
  {
    path: 'overtimes',
    children: OVERTIME_ROUTES,
  },
  {
    path: 'validation-conditions',
    children: ATTENDANCE_VALIDATION_CONDITION_ROUTES,
  },
];

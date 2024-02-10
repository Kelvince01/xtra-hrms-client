import {IBaseModel} from '@models/base.model';
import {Time} from '@angular/common';

export interface IAttendance extends IBaseModel {
  employee?: number;
  attendance_date?: Date;
  shift?: number;
  work_type?: number;
  attendance_day?: number;
  attendance_clock_in?: Time;
  attendance_clock_in_date?: Date;
  attendance_clock_out?: Time;
  attendance_clock_out_date?: Date;
  attendance_worked_hour?: string;
  minimum_hour?: string;
  attendance_overtime?: string;
  attendance_overtime_approve?: boolean;
  attendance_validated?: boolean;
  at_work_second?: number;
  overtime_second?: number;
  approved_overtime_second?: number;
  is_validate_request?: boolean;
  is_validate_request_approved?: boolean;
  request_description?: string;
  request_type?: string;
  requested_data?: string;
}

export interface IEmployeeShiftDay {
  id: number;
  day: string;
  disabled?: boolean;
}

export interface IAttendanceActivity extends IBaseModel {
  employee?: number;
  attendance_date?: Date;
  clock_in_date?: Date;
  shift_day?: number;
  clock_in?: Time;
  clock_out?: Time;
  clock_out_date?: Date;
  status?: string;
  ip_address?: string;
  time_zone?: string;
  lat?: string;
  long?: string;
  organization?: number;
}

export interface IAttendanceOvertime extends IBaseModel {
  employee?: number;
  month?: string;
  month_sequence?: number;
  year?: string;
  hour_account?: string;
  overtime?: string;
  hour_account_second?: number;
  overtime_second?: number;
}

export interface IAttendanceLateComeEarlyOut extends IBaseModel {
  attendance?: number;
  employee?: number;
  type?: string;
}

export interface IAttendanceValidationCondition extends IBaseModel {
  validation_at_work?: string;
  minimum_overtime_to_approve?: string;
  overtime_cutoff?: string;
}

export interface IEmployeeShift extends IBaseModel {
  employee_shift?: string;
  days?: number[];
  weekly_full_time?: string;
  full_time?: string;
}

export interface IEmployeeShiftSchedule extends IBaseModel {
  day?: number;
  shift?: number;
  minimum_working_hour?: string;
  start_time?: Time;
  end_time?: Time;
  is_night_shift?: boolean;
}

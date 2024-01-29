import {Injectable} from '@angular/core';
import {
  IAttendance,
  IAttendanceActivity,
  IAttendanceLateComeEarlyOut,
  IAttendanceOvertime,
  IAttendanceValidationCondition,
  IEmployeeShift,
  IEmployeeShiftSchedule,
} from '@models/attendance.model';
import {BaseService} from './base.service';

@Injectable()
export class AttendanceService extends BaseService<IAttendance> {
  override collectionName = 'attendances';
}

@Injectable()
export class AttendanceActivitiesService extends BaseService<IAttendanceActivity> {
  override collectionName = 'attendance-activities';
}

@Injectable()
export class AttendanceOvertimesService extends BaseService<IAttendanceOvertime> {
  override collectionName = 'attendance-overtimes';
}

@Injectable()
export class AttendanceLateComeEarlyOutsService extends BaseService<IAttendanceLateComeEarlyOut> {
  override collectionName = 'attendance-late-come-early-outs';
}

@Injectable()
export class AttendanceValidationConditionsService extends BaseService<IAttendanceValidationCondition> {
  override collectionName = 'attendance-validation-conditions';
}

@Injectable()
export class EmployeeShiftsService extends BaseService<IEmployeeShift> {
  override collectionName = 'employee-shifts';
}

@Injectable()
export class EmployeeShiftSchedulesService extends BaseService<IEmployeeShiftSchedule> {
  override collectionName = 'employee-shift-schedules';
}

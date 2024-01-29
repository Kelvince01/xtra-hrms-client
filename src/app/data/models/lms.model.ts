import {BaseModel} from '@models/base.model';

export interface Leave extends BaseModel {
  type: number;
  employee: number;
  leave_type: number;
  apply_date: Date;
  start_date: Date;
  end_date: Date;
  reason: string;
  approved_by: number;
  is_approved: boolean;
  designation: string;
  nin: string;
  _year: string;
  supervisor: string;
  sup_Status: string;
  hod: string;
  hod_status: string;
  balance: number;
  status: string;

  imageUrl?: string;
  comments?: string;
  approved_date?: Date;
  approved?: boolean;
  cancelled?: boolean;
  no_of_days?: number;
  period?: string;
}

export interface ILeave extends BaseModel {
  employee: number;
  leave_type: number;
  apply_date: Date;
  start_date: Date;
  end_date: Date;
  reason: string;
  approved_by: number;
  is_approved: boolean;
  designation: string;
  nin: string;
  _year: string;
  supervisor: string;
  sup_Status: string;
  hod: string;
  hod_status: string;
  balance: number;
  status: string;
  financial_year: number;
  leave_date: Date;
  leave_return_date: Date;
  leave_mode: string;
  attachments: any;
  comment: string;
}

export interface LeaveType extends BaseModel {
  name: string;
  description: string;
}

export interface ILeaveType extends BaseModel {
  name: string;
  description: string;
  icon: any;
  color: string;
  payment: string;
  count: number;
  period_in: string;
  total_days: number;
  reset: boolean;
  reset_based: string;
  reset_month: string;
  reset_day: string;
  reset_weekend: string;
  carryforward_type: string;
  carryforward_max: number;
  carryforward_expire_in: number;
  carryforward_expire_period: string;
  require_approval: string;
  require_attachment: string;
  exclude_organization_leave: string;
  exclude_holiday: string;
}

export interface IAvailableLeave extends BaseModel {
  leave_type: number;
  employee: number;
  available_days: number;
  carryforward_days: number;
  total_leave_days: number;
  assigned_date: Date;
  reset_date: Date;
  expired_date: Date;
}

export interface IOrganizationLeave extends BaseModel {
  based_on_week: string;
  based_on_week_day: string;
}

export interface IHoliday extends BaseModel {
  name: string;
  start_date: Date;
  end_date: Date;
  recurring: boolean;
}

export interface ILeaveRequest extends BaseModel {
  leave_type: number;
  employee: number;
  start_date: Date;
  start_date_breakdown: string;
  end_date: Date;
  end_date_breakdown: string;
  requested_days: number;
  requested_date: Date;
  description: string;
  attachment: any;
  status: string;
  approved_available_days: number;
  approved_carryforward_days: number;
}
export interface ILeaveRequestAddDto extends ILeaveRequest {}
export interface ILeaveRequestUpdateDto extends ILeaveRequest {}

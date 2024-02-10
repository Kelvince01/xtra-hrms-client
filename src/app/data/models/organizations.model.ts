import {IBaseModel} from '@models/base.model';

export interface IOrganization extends IBaseModel {
  name: string;
  license_no?: string;
  contact?: number;
  phone_no?: string;
  address?: string;
  email?: string;
  website?: string;
  description?: string;
  slogan?: string;
  logo?: any;
  pin_no?: string;
  tel_no?: string;
  mobile_no?: string;
  expense_report?: any;
  user_limit?: number;
  extra_fields?: number[];
  vat_no?: string;
  organization_type?: string;
}

export interface IOrganizationInfo extends IBaseModel {
  name: string;
}

export interface ITitle extends IBaseModel {
  emp_no?: number;
  title: string;
  from_date: Date;
  to_date: Date;
}

export interface IBranch extends IBaseModel {
  name: string;
  branch_code: string;
  location: string;
  phone_no: string;
  email: string;
  created: Date;
}

export interface IDepartment extends IBaseModel {
  name?: string;
  code?: string;
  description?: string;
  organization?: number;
  hod?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status?: any;

  history?: any;
}

export interface NewDepartment {
  id: number;
  name: string;
  description: string;
}

export interface UpdateDepartment {
  id: number;
  name: string;
  description: string;
}

export interface IGroup extends IBaseModel {
  name?: string;
}

export interface ISection extends IBaseModel {
  name?: string;
  description?: string;
  department?: number;
}

export interface IDepartmentSection extends IBaseModel {
  name?: string;
  department?: number;
  description?: string;
}

export interface NewOrganization extends IOrganization {}

export interface UpdateOrganization extends IOrganization {}

export interface IPosition {
  count: number;
  id?: number;
  title: string;
  description: string;
  number_of_slots: number;
  type: string;
  salary: number;
  salary_range: string;
  currency: number;
}

export interface NewPosition extends IPosition {}

export interface UpdatePosition extends IPosition {}

export interface IJobPosition extends IBaseModel {
  job_position: string;
  department: number;
}

export interface IJobRole extends IBaseModel {
  job_position: number;
  job_role: string;
}

export interface IJobPosition extends IBaseModel {
  job_position: string;
  department: number;
}

export interface IWorkType extends IBaseModel {
  work_type: string;
}

export interface ITeam {
  department: number;
  name: string;
  supervisor: number;
  status: string;
}

export interface IAssetLot extends IBaseModel {
  lot_number: string;
  lot_description: string;
}

export interface IAssetCategory extends IBaseModel {
  name: string;
  description: string;
}

export interface IAsset extends IBaseModel {
  name: string;
  description: string;
  tracking_id: string;
  purchase_date: Date | string;
  purchase_cost: string;
  status: string;
  category: number;
  lot_number: number;
}

export interface IAssetAssignment extends IBaseModel {
  assigned_date: Date;
  return_date?: Date;
  return_condition?: string;
  return_status: string;
  asset: number;
  assigned_to_employee: number;
  assigned_by_employee_id?: number;
}

export interface IRequestAsset extends IBaseModel {
  requested_employee: number;
  asset_category: string;
  asset_request_date: Date;
  description: string;
  asset_request_status: string;
}

export interface IEvent {
  id?: string;
  title?: string;
  description?: string;
  attendees?: any[];
  owner?: number;
  start_at?: Date;
  end_at?: Date;
  location?: string;
  invitation_sent?: boolean;
  google_calendar_event_id?: string;
}

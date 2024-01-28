import {BaseModel} from './base.model';

export interface EmployeeModel extends BaseModel {
  is_available?: boolean;
  email: string;
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
  photo?: string;
}

export interface NewEmployeeModel {
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
}

export interface UpdateEmployeeModel extends BaseModel {
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
}

export interface IEmployee extends BaseModel {
  firstname: string;
  middlename?: string;
  lastname: string;
  national_id?: number;
  gender?: string;
  user?: number;
  date_of_birth?: Date;
  title?: string;
  email: string;
  phone_no?: string;
  hire_date?: Date;
  status?: string;
  is_active?: boolean;
  marital_status?: string;
  department?: number;
  start_date?: Date;
  nssf_no?: string;
  nhif_no?: string;
  kra_pin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
}

export interface NewEmployee {
  firstname: string;
  middlename?: string;
  lastname: string;
  national_id?: number;
  gender?: string;
  user?: number;
  date_of_birth?: Date;
  email: string;
  phone_no?: string;
  hire_date?: Date;
  status?: string;
  marital_status?: string;
  department?: number;
  start_date?: Date;
  nssf_no?: string;
  nhif_no?: string;
  kra_pin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
}

export interface IEmployeeInfo extends BaseModel {
  firstname: string;
  lastname: string;
  date_of_birth?: Date;
  title?: string;
  email?: string;
}

export interface IHrDetail extends BaseModel {
  employee?: number;
  job_number?: string;
  employment_type?: string;
  date_of_employment?: Date;
  start_date?: Date;
  department?: number;
  hire_date?: Date;
  work_station?: string;
  branch?: number;
  contract_start_date?: Date;
  contract_end_date?: Date;
  board_director?: boolean;
  job_title?: string;
  head_of?: number;
  reports_to?: number;
  region?: string;
  project?: number;
}

export interface IWorkSheet extends BaseModel {
  employee?: number;
  work_mode_id?: number;
  start_time?: Date;
  end_time?: Date;
  duration?: number;
  note?: string;
  approved?: boolean;
}

export interface IWorkTypeRequest extends BaseModel {}

export interface IRotatingShift extends BaseModel {}

export interface IShiftRequest extends BaseModel {}

export interface IRotatingShiftAssign extends BaseModel {}

export interface IRotatingWorkType extends BaseModel {}

export interface IRotatingWorkTypeAssign extends BaseModel {}

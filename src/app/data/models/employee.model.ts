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

export interface UpdateEmployee extends IEmployee {}

export interface IEmployeeInfo extends BaseModel {
  firstname: string;
  lastname: string;
  date_of_birth?: Date;
  title?: string;
  email?: string;
}

export interface IEmployeeV2 extends BaseModel {
  vacancy_id?: number;
  branch_id?: number;
  pay_grade_id?: number;
  designation_id?: number;
  vacancy_app_status_id?: number;
  suffix?: string;
  website?: string;
  mobile?: string;
  tel?: string;
  fax?: string;
  face_photo?: string;
  organization_name?: string;
  legal_name?: string;
  ac_payable_id?: number;
  ap_id?: number;
  ap_opening_bal?: number;
  exchange_rate?: number;
  full_time_director?: boolean;
  other_director?: boolean;
  retired?: boolean;
  other_employment?: boolean;
  agricultural?: boolean;
  closed_contract?: boolean;
  date_ending?: Date;
  date_exited?: Date;
  extension?: string;
  pin_no?: string;
  bank_ac_no?: string;
  bank_name?: string;
  sacco?: boolean;
  loan?: boolean;
  car?: boolean;
  helb_beneficiary?: boolean;
  hosp_contr?: boolean;
  life_insure?: boolean;
  education_insure?: boolean;
  home_owner?: boolean;
  hos_plan?: boolean;
  next_of_kin?: string;
  next_phone?: string;
  next_email?: string;
  residence?: string;
  watchman?: boolean;
  gardener?: boolean;
  house_help?: boolean;
  telephone?: boolean;
  housing?: boolean;
  electricity?: boolean;
  water?: boolean;
  furniture?: boolean;
  school_fees?: boolean;
  medical?: boolean;
  pension?: boolean;
  provider_details?: string;
  end_date_checked?: boolean;
  attached_documents?: string;
  local?: boolean;
  sub_organization_id?: number;
  is_cub_organization?: boolean;
  credit_days?: number;
  credit_amount?: number;
  is_foreign?: boolean;
  is_consultant?: boolean;
  is_sub_grantee?: boolean;
  bank_code?: string;
  is_on_trip?: boolean;
  education?: string;
  occupation?: string;
  salary?: string;
  marital_status?: string;
  total_children?: number;
  children_at_home?: number;
  is_house_owner?: boolean;
  number_cars_owned?: number;
  search_terms?: string;
  picture?: Blob;
  thumbnail?: Blob;
  group_id?: number;
  section_id?: number;
  country_id?: number;
  currency_id?: number;
  organization_id?: number;
  bank_id?: number;
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

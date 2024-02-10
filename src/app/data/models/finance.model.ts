import {IBaseModel} from '@models/base.model';

export interface IPayroll extends IBaseModel {
  employee?: number;
  job_department?: number;
  salary_payroll?: number;
  leave?: number;
  salary?: number;
  payment_date?: Date;
  report?: string;
  payment_method?: string;
}

export interface IPayslip extends IBaseModel {
  group_name?: string;
  reference?: string;
  employee?: number;
  payroll_record?: number;
  start_date?: Date;
  end_date?: Date;
  employee_nssf?: number;
  employer_nssf?: number;
  paye?: number;
  total_nssf_contrib?: number;
  overtime?: number;
  bonus?: number;
  sacco_deduction?: number;
  damage_deduction?: number;
  prorate?: string;
  currency?: number;
  pay_head_data?: string;
  contract_wage?: number;
  basic_pay?: number;
  gross_pay?: number;
  deduction?: number;
  net_pay?: number;
  status?: string;
}

export interface IWorkRecord extends IBaseModel {
  record_name?: string;
  work_record_type?: string;
  employee?: number;
  date?: Date;
  at_work?: string;
  min_hour?: string;
  at_work_second?: number;
  min_hour_second?: number;
  note?: string;
  color?: string;
  message?: string;
  is_attendance_record?: boolean;
  is_leave_record?: boolean;
  day_percentage?: number;
}

export interface IContract extends IBaseModel {
  name?: string;
  employee?: number;
  start_date?: Date;
  end_date?: Date;
  wage_type?: string;
  wage?: number;
  calculate_daily_leave_amount?: boolean;
  deduction_for_one_leave_amount?: number;
  deduct_leave_from_basic_pay?: boolean;
  department?: number;
  job_position?: number;
  job_role?: number;
  shift?: number;
  work_type?: number;
  filing_status?: number;
  pay_frequency?: string;
  document?: any;
  is_active?: boolean;
  status?: string;
  note?: string;
  risk?: string;
}

export interface IAllowance extends IBaseModel {
  title?: string;
  one_time_date?: Date;
  include_active_employees?: boolean;
  specific_employees?: number[];
  exclude_employees?: number[];
  is_taxable?: boolean;
  is_condition_based?: boolean;
  field?: string;
  condition?: string;
  value?: string;
  is_fixed?: boolean;
  amount?: number;
  based_on?: string;
  rate?: boolean;
  per_attendance_fixed_amount?: number;
  shift?: number;
  shift_per_attendance_amount?: number;
  amount_per_one_hr?: number;
  work_type?: number;
  work_type_per_attendance_amount?: number;
  has_max_limit?: boolean;
  maximum_amount?: number;
  maximum_unit?: string;
  if_choice?: string;
  if_condition?: string;
  if_amount?: number;
  is_tax?: boolean;
  is_pretax?: boolean;
  update_compensation?: string;
  employer_rate?: number;
}

export interface IDeduction extends IBaseModel {
  title?: string;
  one_time_date?: Date;
  include_active_employees?: boolean;
  specific_employees?: number[];
  exclude_employees?: number[];
  is_condition_based?: boolean;
  field?: string;
  condition?: string;
  value?: string;
  is_fixed?: boolean;
  amount?: number;
  based_on?: string;
  rate?: boolean;
  has_max_limit?: boolean;
  maximum_amount?: number;
  maximum_unit?: string;
  if_choice?: string;
  if_condition?: string;
  if_amount?: number;
}

export interface IFilingStatus extends IBaseModel {
  filing_status?: string;
  based_on?: string;
  description?: string;
}

export interface IPayrollSetting extends IBaseModel {
  currency_symbol?: string;
}

export interface ITaxBracket extends IBaseModel {
  filing_status?: number;
  min_income?: number;
  max_income?: number;
  tax_rate?: number;
}

export interface IFederalTax extends IBaseModel {
  filing_status?: number;
  taxable_gross?: number;
}

export interface IBank extends IBaseModel {
  name?: string;
  short_name?: string;
  branch?: string;
  swift_code?: string;
  po_box?: string;
  zip_code?: string;
  town?: string;
  bank_no?: string;
  country?: string;
  added_on?: Date;
}

export interface IBankBranch extends IBaseModel {
  name?: string;
  bank?: number;
  branch_no?: string;
  manager?: string;
  telephone?: string;
  email?: string;
}

export interface IEmployeeBankAccount extends IBaseModel {
  bank_name?: string;
  reserved?: boolean;
}

export interface IEmployeeBank extends IBaseModel {
  employee?: number;
  bank?: number;
  account_no?: string;
  currency?: number;
  bank_branch?: number;
  bank_account_no?: string;
  bank_account_name?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  any_other_code1?: string;
  any_other_code2?: string;
  additional_info?: string;
  added_on?: Date;
}

export interface IAccountType extends IBaseModel {
  type?: string;
  description?: string;
}

export interface IAccount extends IBaseModel {
  account_no?: string;
  name?: string;
  description?: string;
  reserved_ac?: boolean;
  account_type_id?: number;
  sub_account?: boolean;
  main_account?: number;
  active?: boolean;
  bank_ac_no?: string;
  bank?: string;
  opening_bal?: number;
  bal_date?: Date;
  notes?: string;
  tax_id?: number;
  account_details?: string;
  foreign?: boolean;
  currency_id?: number;
  exchange_rate?: number;
  organization_id?: number;
  frequency?: number;
  number?: number;
  rate?: number;
  amount?: number;
}

export interface ITransaction extends IBaseModel {
  /*
  type;
  account_id;
  progress;
  status;
  cut_off;
  value_date;
  currency;
  amount;
  transaction_id;
  beneficiary;
  notional;
  coupon;
   */
}

export interface IPaymentMethod extends IBaseModel {
  paymentSourceType?: string;
  name?: string;
  priceAmountCents?: number;
  priceAmountFloat?: number;
  formattedPriceAmount?: string;
  orderId?: string;
}

export interface PaymentSourceModel extends IBaseModel {
  approvalUrl?: string;
  cancelUrl?: string;
  name?: string;
  noteToPayer?: string;
  returnUrl?: string;
  status?: string;
}

export interface IPaypalPayment extends PaymentSourceModel, IBaseModel {
  orderId?: string;
  paypalId?: string;
  paypalPayerId?: string;
}

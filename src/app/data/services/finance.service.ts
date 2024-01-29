/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Injectable} from '@angular/core';
import {
  IAllowance,
  IBank,
  IContract,
  IDeduction,
  IFederalTax,
  IFilingStatus,
  IPayroll,
  IPayrollSetting,
  IPayslip,
  IWorkRecord,
} from '@models/finance.model';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class PayrollsService extends BaseService<IPayroll> {
  collectionName = 'payrolls';
}

@Injectable()
export class BanksService extends BaseService<IBank> {
  override collectionName = 'banks';
}

@Injectable()
export class PayslipsService extends BaseService<IPayslip> {
  override collectionName = 'payslips';
}

@Injectable()
export class WorkRecordsService extends BaseService<IWorkRecord> {
  override collectionName = 'work-records';
}

@Injectable()
export class ContractsService extends BaseService<IContract> {
  override collectionName = 'contracts';
}

@Injectable()
export class AllowancesService extends BaseService<IAllowance> {
  override collectionName = 'allowances';
}

@Injectable()
export class DeductionsService extends BaseService<IDeduction> {
  override collectionName = 'deductions';
}

@Injectable()
export class FilingStatussService extends BaseService<IFilingStatus> {
  override collectionName = 'filing-statuses';
}

@Injectable()
export class PayrollSettingsService extends BaseService<IPayrollSetting> {
  override collectionName = 'payroll-settings';
}

@Injectable()
export class FederalTaxsService extends BaseService<IFederalTax> {
  override collectionName = 'federal-taxes';
}

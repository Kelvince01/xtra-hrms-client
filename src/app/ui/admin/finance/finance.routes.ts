/*
 * Copyright (c) 2024.  Kelvince Phillips
 */

import {ALLOWANCE_ROUTES} from '@admin-ui/finance/allowances/allowances.routes';
import {BANK_ROUTES} from '@admin-ui/finance/banks/banks.routes';
import {CONTRACT_ROUTES} from '@admin-ui/finance/contracts/contracts.routes';
import {DEDUCTION_ROUTES} from '@admin-ui/finance/deductions/deductions.routes';
import {FEDERAL_TAX_ROUTES} from '@admin-ui/finance/federal-taxes/federal-taxes.routes';
import {FILING_STATUS_ROUTES} from '@admin-ui/finance/filing-statuses/filing-statuses.routes';
import {PAYROLL_SETTING_ROUTES} from '@admin-ui/finance/payroll-settings/payroll-settings.routes';
import {PAYROLL_ROUTES} from '@admin-ui/finance/payrolls/payrolls.routes';
import {PAYSLIP_ROUTES} from '@admin-ui/finance/payslips/payslips.routes';
import {WORK_RECORD_ROUTES} from '@admin-ui/finance/work-records/work-records.routes';
import {Routes} from '@angular/router';

export const FINANCE_ROUTES: Routes = [
  {
    path: '',
    children: PAYROLL_ROUTES,
  },
  {
    path: 'banks',
    children: BANK_ROUTES,
  },
  {
    path: 'allowances',
    children: ALLOWANCE_ROUTES,
  },
  {
    path: 'contracts',
    children: CONTRACT_ROUTES,
  },
  {
    path: 'deductions',
    children: DEDUCTION_ROUTES,
  },
  {
    path: 'federal-taxes',
    children: FEDERAL_TAX_ROUTES,
  },
  {
    path: 'filing-statuses',
    children: FILING_STATUS_ROUTES,
  },
  {
    path: 'payroll-settings',
    children: PAYROLL_SETTING_ROUTES,
  },
  {
    path: 'payslips',
    children: PAYSLIP_ROUTES,
  },
  {
    path: 'work-records',
    children: WORK_RECORD_ROUTES,
  },
];

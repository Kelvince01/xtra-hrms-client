/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {
  IAvailableLeave,
  IHoliday,
  ILeave,
  ILeaveRequest,
  ILeaveType,
  IOrganizationLeave
} from '@models/lms.model';
import { Injectable } from '@angular/core';
import {BaseService} from './base.service';

@Injectable({ providedIn: 'root' })
export class LeavesService extends BaseService<ILeave> {
  override collectionName = 'leaves';
}

@Injectable()
export class LeaveTypesService extends BaseService<ILeaveType> {
  override collectionName = 'leave-types';
}

@Injectable()
export class AvailableLeavesService extends BaseService<IAvailableLeave> {
  override collectionName = 'available-leaves';
}

@Injectable()
export class HolidaysService extends BaseService<IHoliday> {
  override collectionName = 'holidays';
}

@Injectable()
export class OrgLeavesService extends BaseService<IOrganizationLeave> {
  override collectionName = 'organization-leaves';
}

@Injectable()
export class LeaveRequestsService extends BaseService<ILeaveRequest> {
  override collectionName = 'leave-requests';
}

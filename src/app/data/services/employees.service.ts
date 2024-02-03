import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {
  IEmployee,
  IRotatingShift,
  IRotatingShiftAssign,
  IRotatingWorkType,
  IRotatingWorkTypeAssign,
  IShiftRequest,
  IWorkTypeRequest,
} from '@data/models';
import {IHrDetail} from '@data/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BaseService<IEmployee> {
  protected collectionName: string = 'employees';
}

@Injectable()
export class HrDetailsService extends BaseService<IHrDetail> {
  override collectionName: string = 'hr-details';
}

@Injectable()
export class WorkTypeRequestsService extends BaseService<IWorkTypeRequest> {
  override collectionName: string = 'work-type-requests';
}

@Injectable()
export class RotatingShiftsService extends BaseService<IRotatingShift> {
  override collectionName = 'rotating-shifts';
}

@Injectable()
export class ShiftRequestsService extends BaseService<IShiftRequest> {
  override collectionName = 'shift-requests';
}

@Injectable()
export class RotatingShiftAssignsService extends BaseService<IRotatingShiftAssign> {
  override collectionName = 'rotating-shift-assigns';
}

@Injectable()
export class RotatingWorkTypesService extends BaseService<IRotatingWorkType> {
  override collectionName = 'rotating-work-types';
}

@Injectable()
export class RotatingWorkTypeAssignsService extends BaseService<IRotatingWorkTypeAssign> {
  override collectionName = 'rotating-work-type-assigns';
}

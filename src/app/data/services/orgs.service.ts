import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {
  IBranch,
  IDepartment,
  IEvent,
  IJobPosition,
  IJobRole,
  IOrganization,
  IWorkType,
} from '@data/models/organizations.model';

@Injectable()
export class OrganizationService extends BaseService<IOrganization> {
  override collectionName = 'organizations';
}

@Injectable()
export class BranchesService extends BaseService<IBranch> {
  override collectionName = 'branches';
}

@Injectable()
export class DepartmentsService extends BaseService<IDepartment> {
  override collectionName = 'departments';
}

@Injectable()
export class EventsService extends BaseService<IEvent> {
  override collectionName: string = 'events';
}

@Injectable()
export class JobRolesService extends BaseService<IJobRole> {
  override collectionName = 'job-roles';
}

@Injectable()
export class JobPositionsService extends BaseService<IJobPosition> {
  override collectionName = 'job-positions';
}

@Injectable()
export class WorkTypesService extends BaseService<IWorkType> {
  override collectionName = 'work-types';
}

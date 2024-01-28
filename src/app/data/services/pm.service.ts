/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Injectable, signal, Signal} from '@angular/core';
import {IProject, ITask, ITaskAssigment} from '@models/pm.model';
import {BaseService} from '@services/base.service';
import {TimeOffRequest} from '@data/types/pm.type';

@Injectable()
export class ProjectsService extends BaseService<IProject> {
  override collectionName = 'projects';
}

@Injectable()
export class TasksService extends BaseService<ITask> {
  override collectionName = 'tasks';
}

@Injectable()
export class TaskAssignmentsService extends BaseService<ITaskAssigment> {
  override collectionName = 'task-assignments';
}

@Injectable()
export class TimeOffManagementService extends BaseService<TimeOffRequest> {
  override collectionName = 'task-assignments';
  requests: Signal<TimeOffRequest[]> = signal([]);
  resolvedRequests: Signal<TimeOffRequest[]> = signal([]);
  selectedType: any;

  approveRequest(request: TimeOffRequest) {}

  rejectRequest(request: TimeOffRequest) {}

  deleteRequest(request: TimeOffRequest) {}
}

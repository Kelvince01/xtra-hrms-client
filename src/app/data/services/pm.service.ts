/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TimeOffRequest } from '@data/types/pm.type';
import { IProject, ITask, ITaskAssigment } from '@models/pm.model';
import { BaseService } from '@services/base.service';
import { Subject, map, merge, switchMap } from 'rxjs';

@Injectable()
export class ProjectsService extends BaseService<IProject> {
  override collectionName = 'projects';

  getProjectsByEmployeeId(employeeId: number) {
    return this.http.get<IProject[]>(`/projects?employees_like=${employeeId}`);
  }
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
  private readonly timeOffRequestService = inject(TimeOffRequestService);

  constructor() {
    super(null as any, null as any);
    effect(() => {
      localStorage.setItem('selectedType', this.selectedType());
    });
  }

  deleteRequest$ = new Subject<TimeOffRequest>();
  approveRequest$ = new Subject<TimeOffRequest>();
  rejectRequest$ = new Subject<TimeOffRequest>();

  selectedType = signal<
    'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other' | ''
  >((localStorage.getItem('selectedType') as any) ?? '');
  requests = toSignal(
    merge(
      toObservable(this.selectedType),
      this.deleteRequest$.pipe(switchMap(r => this.timeOffRequestService.deleteRequest(r.id))),
      this.approveRequest$.pipe(switchMap(r => this.timeOffRequestService.approveRequest(r.id))),
      this.rejectRequest$.pipe(switchMap(r => this.timeOffRequestService.rejectRequest(r.id))),
    ).pipe(
      switchMap(() => {
        return this.timeOffRequestService.getRequestsByType(this.selectedType());
      }),
    ),
    {
      initialValue: [] as TimeOffRequest[],
    },
  );
  resolvedRequests = computed(() => this.requests().filter(r => r.status !== 'Pending'));

  approveRequest(request: TimeOffRequest) {
    this.approveRequest$.next(request);
  }

  rejectRequest(request: TimeOffRequest) {
    this.rejectRequest$.next(request);
  }

  deleteRequest(request: TimeOffRequest) {
    this.deleteRequest$.next(request);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TimeOffRequestService {
  private readonly http = inject(HttpClient);

  getRequests(query = '') {
    return this.http.get<TimeOffRequest[]>('/time-off-requests');
  }

  getRequestsByType(query = '') {
    return this.http.get<TimeOffRequest[]>('/time-off-requests').pipe(
      map(requests => {
        return query === '' ? requests : requests.filter(r => r.type === query);
      }),
    );
  }

  rejectRequest(id: number) {
    return this.http.patch(`/time-off-requests/${id}`, { status: 'Rejected' });
  }

  approveRequest(id: number) {
    return this.http.patch(`/time-off-requests/${id}`, { status: 'Approved' });
  }

  deleteRequest(id: number) {
    return this.http.delete(`/time-off-requests/${id}`);
  }
}

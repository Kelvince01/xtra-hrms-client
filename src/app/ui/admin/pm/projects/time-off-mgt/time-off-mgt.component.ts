import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeOffRequest } from '@data/types/pm.type';
import { TimeOffManagementService } from '@services/pm.service';

@Component({
  selector: 'xtra-time-off-mgt',
  standalone: true,
  imports: [DatePipe, FormsModule],
  template: `
    <h2>Time Off Management</h2>
    <h3>Resolved {{ resolvedRequests().length }} / {{ requests().length }} Unresolved</h3>
    <p>
      <select
        [ngModel]="selectedType()"
        (ngModelChange)="selectedType.set($any($event))"
        placeholder="Filter by request type">
        <option value="">All</option>
        <option value="Vacation">Vacation</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Maternity Leave">Maternity Leave</option>
        <option value="Paternity Leave">Paternity Leave</option>
        <option value="Other">Other</option>
      </select>
    </p>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Type</th>
          <th>Status</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (request of requests(); track request) {
          <tr>
            <td>{{ request.employeeId }}</td>
            <td>{{ request.startDate | date }}</td>
            <td>{{ request.endDate | date }}</td>
            <td>{{ request.type }}</td>
            <td>{{ request.status }}</td>
            <td>{{ request.comment }}</td>
            <td>
              @if (request.status === 'Pending') {
                <button (click)="approveRequest(request)">Approve</button>
              }
              @if (request.status === 'Pending') {
                <button (click)="rejectRequest(request)">Reject</button>
              }
              <button (click)="deleteRequest(request)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
  providers: [TimeOffManagementService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeOffMgtComponent {
  private readonly timeOffsService = inject(TimeOffManagementService);
  requests = this.timeOffsService.requests;
  resolvedRequests = this.timeOffsService.resolvedRequests;
  selectedType = this.timeOffsService.selectedType;

  approveRequest(request: TimeOffRequest) {
    this.timeOffsService.approveRequest(request);
  }

  rejectRequest(request: TimeOffRequest) {
    this.timeOffsService.rejectRequest(request);
  }

  deleteRequest(request: TimeOffRequest) {
    this.timeOffsService.deleteRequest(request);
  }
}

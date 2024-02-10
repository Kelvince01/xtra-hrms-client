import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {INotification} from '@data/models/notification.model';
import {MatListItem} from '@angular/material/list';

@Component({
  selector: 'xtra-notification-item',
  standalone: true,
  imports: [MatListItem],
  template: `
    <mat-list-item>
      <div class="item-thumbnail item-thumbnail-icon">
        <i class="mdi mdi-email-outline"></i>
      </div>
      <div class="item-content d-flex align-items-start flex-column justify-content-center">
        <h6 class="item-subject font-weight-normal">You received a new message</h6>
        <p class="text-muted tx-12 mb-0">6 min ago</p>
      </div>
    </mat-list-item>
    <mat-list-item>
      <div class="item-thumbnail item-thumbnail-icon">
        <i class="mdi mdi-account-outline"></i>
      </div>
      <div class="item-content d-flex align-items-start flex-column justify-content-center">
        <h6 class="item-subject font-weight-normal">New user registered</h6>
        <p class="text-muted tx-12 mb-0">15 min ago</p>
      </div>
    </mat-list-item>
    <mat-list-item>
      <div class="item-thumbnail item-thumbnail-icon">
        <i class="mdi mdi-alert-circle-outline"></i>
      </div>
      <div class="item-content d-flex align-items-start flex-column justify-content-center">
        <h6 class="item-subject font-weight-normal">System Alert</h6>
        <p class="text-muted tx-12 mb-0">2 days ago</p>
      </div>
    </mat-list-item>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent {
  @Input()
  notification!: INotification;
}

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatList, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'xtra-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatDivider,
    MatNavList,
    MatList,
    MatIcon,
    MatFormField,
    MatLabel,
    FormsModule,
    MatButton,
    MatSlideToggle,
  ],
  template: `
    <div class="profile-root template-root">
      <mat-card>
        <mat-card-header>Organization</mat-card-header>
        <mat-divider></mat-divider>
        <mat-nav-list>
          <!--xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>business</mat-icon>
            <div xtra-ui-title>Acme Steel Co.</div>
            <div xtra-ui-subtitle>Organization Name</div>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center">
            <mat-icon xtra-ui-icon>place</mat-icon>
            <div xtra-ui-title>1000 Acme Way Gary, In 46402</div>
            <div xtra-ui-subtitle>Address</div>
          </xtra-ui-info-list-item-->
        </mat-nav-list>
      </mat-card>

      <mat-card style="margin-top: 24px">
        <mat-card-header>Account</mat-card-header>
        <mat-divider></mat-divider>
        <mat-list>
          <!--xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>account_circle</mat-icon>
            <div xtra-ui-title>Marshall Sutter</div>
            <div xtra-ui-subtitle>Name</div>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>account_circle</mat-icon>
            <div xtra-ui-title>{{ nickname }}</div>
            <div xtra-ui-subtitle>Nickname</div>
            <div xtra-ui-right-content style="display: flex; justify-content: center">
              <mat-form-field appearance="outline" style="height: 72px">
                <input matInput placeholder="Nickname" [(ngModel)]="nickname" />
                <mat-label>Nickname</mat-label>
              </mat-form-field>
            </div>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>email</mat-icon>
            <div xtra-ui-title>msutteracmesteel.com</div>
            <div xtra-ui-subtitle>Email</div>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>phone</mat-icon>
            <div xtra-ui-title>+1 (724) 998-0938</div>
            <div xtra-ui-subtitle>Phone Number</div>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>lock</mat-icon>
            <div xtra-ui-title>**************</div>
            <div xtra-ui-subtitle>Change Password</div>
            <button xtra-ui-right-content color="primary" mat-stroked-button>
              Change Password
            </button>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>
              {{ notifications ? 'notifications' : 'notifications_off' }}
            </mat-icon>
            <div xtra-ui-title>Email Notifications</div>
            <div xtra-ui-subtitle>Notifications {{ notifications ? 'Enabled' : 'Disabled' }}</div>
            <mat-slide-toggle [(ngModel)]="notifications" xtra-ui-right-content></mat-slide-toggle>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>
              {{ textNotifications ? 'notifications' : 'notifications_off' }}
            </mat-icon>
            <div xtra-ui-title>Text Notifications</div>
            <div xtra-ui-subtitle>
              Notifications {{ textNotifications ? 'Enabled' : 'Disabled' }}
            </div>
            <mat-slide-toggle
              [(ngModel)]="textNotifications"
              xtra-ui-right-content
            ></mat-slide-toggle>
          </xtra-ui-info-list-item>
          <xtra-ui-info-list-item iconAlign="center" divider="full">
            <mat-icon xtra-ui-icon>{{ autoLogout ? 'lock' : 'lock_open' }}</mat-icon>
            <div xtra-ui-title>Automatic Logout</div>
            <div xtra-ui-subtitle>{{ autoLogout ? 'Enabled (Recommended)' : 'Disabled' }}</div>
            <mat-slide-toggle [(ngModel)]="autoLogout" xtra-ui-right-content></mat-slide-toggle>
          </xtra-ui-info-list-item-->
        </mat-list>
      </mat-card>
    </div>
  `,
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'xtra-profile',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  notifications = true;
  textNotifications = true;
  autoLogout = true;
  nickname = 'Marsh Mellow';
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'xtra-msg-icon-btn',
  standalone: true,
  imports: [MatIconButton],
  template: `
    <button mat-icon-button class="msg-btn">
      <span>{{ number }}</span>
      <i class="material-icons icon-btn">{{ icon }}</i>
      <!--
      <mat-icon [matBadge]='notificationsCount' matBadgeColor='accent' aria-label='notifications count'>
              notification_important
            </mat-icon>
      -->
    </button>
  `,
  styles: `
      .msg-btn {
        position: relative;
      }

      .msg-btn i {
        font-size: 19px;
        color: #555;
      }

      .msg-btn span {
        position: absolute;
        top: 2px;
        border: 1px solid #fff;
        right: 2px;
        font-size: 9px;
        background: #f44336;
        color: #fff;
        min-width: 20px;
        padding: 0px 5px;
        height: 20px;
        border-radius: 10px;
        text-align: center;
        line-height: 19px;
        vertical-align: middle;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsgIconBtnComponent {
  @Input() number?: string;
  @Input() icon?: string;
}

/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'xtra-ui-user-menu-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="xtra-ui-user-menu-avatar-content">
      @if (avatarValue) {
        <div class="mat-h2 xtra-ui-user-menu-text-avatar">
          {{ avatarValue }}
        </div>
      }
      @if (avatarImage) {
        <img [src]="avatarImage" alt="User Menu Avatar" />
      }
      <ng-content></ng-content>
    </div>
  `,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'xtra-ui-user-menu-avatar',
  },
  imports: [NgIf],
})
export class UserMenuAvatarComponent {
  @Input() avatarValue: string = '';
  @Input() avatarImage: string = '';
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUser} from '@data/models';
import {AvatarComponent} from '@shared/components/avatar/avatar.component';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'xtra-user-avatar',
  standalone: true,
  imports: [AvatarComponent, SlicePipe],
  template: `
    <div class="flex items-center">
      <!--      <xtra-avatar [avatarUrl]="user.photo" [size]="20"></xtra-avatar>-->
      @if (user.photo) {
        <img
          [src]="user.photo"
          alt="User Menu Avatar"
          width="20"
          height="20"
          style="display: flex; border-radius: 50%;"
        />
      } @else {
        <div>
          {{ user.username | slice: 0 : 2 }}
        </div>
      }
      <span class="ml-1-5 mr-1-5 user-name">
        {{ user.username }}
      </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @Input() user!: IUser;
}

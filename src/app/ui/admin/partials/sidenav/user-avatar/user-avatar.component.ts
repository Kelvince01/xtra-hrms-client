import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUser} from '@data/models';
import {AvatarComponent} from '@shared/components/avatar/avatar.component';

@Component({
  selector: 'xtra-user-avatar',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center">
      <xtra-avatar [avatarUrl]="user?.photo" [size]="20"></xtra-avatar>
      <span class="ml-1-5 mr-1-5 user-name">
        {{ user?.username }}
      </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @Input() user!: IUser;
}

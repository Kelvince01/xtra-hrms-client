import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUser} from '@data/models';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'xtra-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user!: IUser;
  @Input() isLoggedIn!: boolean;
}

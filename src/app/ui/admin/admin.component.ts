import { SidenavComponent } from '@admin-ui/partials/sidenav/sidenav.component';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INotification } from '@models/notification.model';
import { SvgDefinitionsComponent } from '@shared/components/svgs/svg-definitions/svg-definitions.component';
import { LocalStorageJwtService } from '@shared/services';
import { AuthStore } from '@stores/auth';
import { filter, take } from 'rxjs';
import { FooterComponent } from './partials/footer/footer.component';

@Component({
  selector: 'xtra-admin',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, SidenavComponent, SvgDefinitionsComponent],
  template: `
    <xtra-sidenav [isLoggedIn]="$isLoggedIn()" [user]="$user()" [notifications]="notifications">
      <div class="content">
        <router-outlet></router-outlet>

        @defer (on idle) {
          <xtra-footer></xtra-footer>
          <xtra-svg-definitions></xtra-svg-definitions>
        }
      </div>
    </xtra-sidenav>
  `,
  styles: [
    `
      :host {
        //display: flex;
        //flex-direction: row;
      }

      .content {
        //padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly authStore = inject(AuthStore);

  $user = this.authStore.user;
  $isLoggedIn = this.authStore.isAuthenticated;
  notifications: INotification[] = [];

  ngOnInit(): void {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter(token => !!token?.access),
      )
      .subscribe(() => this.authStore.getUser());
  }
}

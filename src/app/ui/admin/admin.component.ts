import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LocalStorageJwtService} from '@shared/services';
import {AuthStore} from '@stores/auth';
import {filter, take} from 'rxjs';
import {FooterComponent} from './partials/footer/footer.component';
import {SidenavComponent} from '@admin-ui/partials/sidenav/sidenav.component';

@Component({
  selector: 'xtra-admin',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, SidenavComponent],
  template: `
    <xtra-sidenav [isLoggedIn]="$isLoggedIn()" [user]="$user()">
      <div class="content">
        <router-outlet></router-outlet>

        @defer (on idle) {
          <xtra-footer></xtra-footer>
        }
      </div>
    </xtra-sidenav>
  `,
  styles: [
    `
      :host {
        //min-height: 100vh;

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

  ngOnInit(): void {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.authStore.getUser());
  }
}

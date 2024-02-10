import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {AuthStore} from '@data/store/auth';
import {LocalStorageJwtService} from '@shared/services';
import {filter, take} from 'rxjs';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './partials/footer/footer.component';

@Component({
  selector: 'xtra-blog',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  template: `
    <xtra-navbar [isLoggedIn]="$isLoggedIn()" [user]="$user()"></xtra-navbar>
    <router-outlet></router-outlet>

    @defer (on idle) {
      <xtra-footer></xtra-footer>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly authStore = inject(AuthStore);

  $user = this.authStore.user;
  $isLoggedIn = this.authStore.isAuthenticated;

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token?.access),
      )
      .subscribe(() => this.authStore.getUser());
  }
}

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { LocalStorageJwtService } from '../../shared/services/local-storage-jwt.service';
import {AuthStore} from "../../data/store/auth/auth.store";
import {filter, take} from "rxjs";
import {NavbarComponent} from "./partials/navbar/navbar.component";
import {FooterComponent} from "./partials/footer/footer.component";

@Component({
  selector: 'xtra-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  template: `
    <xtra-navbar [isLoggedIn]="$isLoggedIn()" [user]="$user()"></xtra-navbar>
    <router-outlet></router-outlet>

    @defer (on idle) {
      <xtra-footer></xtra-footer>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent  implements OnInit {
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly authStore = inject(AuthStore);

  $user = this.authStore.user;
  $isLoggedIn = this.authStore.isAuthenticated;

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.authStore.getUser());
  }
}

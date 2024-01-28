import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserModel} from '@data/models';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'xtra-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Xtra HRMS (Client)</a>

        @if (!isLoggedIn) {
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <a class="nav-link" routerLink="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/accounts/sign-in" routerLinkActive="active">
                Sign in
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/accounts/sign-up" routerLinkActive="active">
                Sign up
              </a>
            </li>
          </ul>
        } @else {
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <a
                class="nav-link active"
                [routerLink]="['/']"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/employees" routerLinkActive="active">
                <i class="ion-compose"></i>
                &nbsp;Employees
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/settings" routerLinkActive="active">
                <i class="ion-gear-a"></i>
                &nbsp;Settings
              </a>
            </li>
            <li class="nav-item">
              <a
                data-e2e-id="loggedin-user"
                class="nav-link"
                [routerLink]="['/profile', user.username]"
                routerLinkActive="active"
              >
                {{ user.username }}
              </a>
            </li>
          </ul>
        }
      </div>
    </nav>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user!: UserModel;
  @Input() isLoggedIn!: boolean;
}

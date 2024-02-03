import {ChangeDetectorRef, Component, inject, Input, OnDestroy, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {IUser} from '@data/models';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatLine} from '@angular/material/core';
import {TranslateModule} from '@ngx-translate/core';
import {LangComponent} from '@shared/components/lang/lang.component';
import {AuthService} from '@data/services';
import {UiSpacerComponent} from '@ui-components/ui-spacer/ui-spacer.component';
import {MsgIconBtnComponent} from '@shared/components/msg-icon-btn/msg-icon-btn.component';
import {SidenavService} from './sidenav.service';
import {NavItem} from '@admin-ui/partials/sidenav/admin.menu';
import {SidenavListItemComponent} from '@admin-ui/partials/sidenav/sidenav-list-item.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {ThemeService} from '@shared/services/theme.service';

@Component({
  selector: 'xtra-sidenav',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar class="sidenav-header">
          <img
            ngSrc="./../../../../../assets/images/logo.png"
            [height]="25"
            [width]="25"
            alt="Xtra HRMS Admin Logo"
          />
          <span class="sidenav-header-title">Xtra HRMS (Admin)</span>
        </mat-toolbar>

        <mat-nav-list>
          @for (nav of fillerNav; track nav.title) {
            <xtra-sidenav-list-item [nav]="nav" (navLinkClick)="navLinkClick()">
              <mat-icon icon>{{ nav.icon }}</mat-icon>

              {{ nav.title | translate }}
            </xtra-sidenav-list-item>

            @if (nav.children) {
              @for (navChild of nav.children; track navChild.title) {
                <mat-expansion-panel [class.mat-elevation-z0]="true" dense>
                  <mat-expansion-panel-header>Preference</mat-expansion-panel-header>
                  <mat-nav-list dense>
                    <a mat-list-item routerLink="#">
                      <mat-icon>attach_money</mat-icon>
                      Billing
                    </a>
                    <a mat-list-item routerLink="#">
                      <mat-icon>notification_important</mat-icon>
                      Notification
                    </a>
                  </mat-nav-list>
                </mat-expansion-panel>
              }
            }
          }
        </mat-nav-list>

        <div class="sidenav-menu-footer">
          <mat-divider></mat-divider>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          @if ((isHandset$ | async) === false) {
            <button
              class="toggle-button"
              (click)="drawer.toggle()"
              [class.is-flipped]="sidenavService.isExpanded"
            >
              <!--              this.sidenavService.toggleSidenav()-->
              <mat-icon icon>chevron_right</mat-icon>
            </button>
          }

          @if (isHandset$ | async) {
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()"
            >
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
          }
          <div class="mat-title" style="cursor: pointer">
            {{ 'common.app-title' | translate }}
          </div>

          <xtra-ui-spacer></xtra-ui-spacer>
          <div style="display: flex">
            <mat-divider [vertical]="true" class="d-md-block d-none"></mat-divider>

            <button mat-icon-button matTooltip="Switch Apps">
              <mat-icon>apps</mat-icon>
            </button>

            <button
              (click)="toggleTheme()"
              class="toggle-theme"
              mat-icon-button
              style="margin: 0 4px"
            >
              <mat-icon>invert_colors</mat-icon>
            </button>

            <xtra-lang class="flex flex-auto"></xtra-lang>

            <!--notification_important-->
            <xtra-msg-icon-btn
              class="m-r-5"
              icon="notifications"
              number="5"
              [matMenuTriggerFor]="menu"
              matTooltip="Notifications"
            ></xtra-msg-icon-btn>
            <mat-menu #menu="matMenu" class="notificationsMenu">
              <h6 class="title">
                <i class="mdi mdi-bell-outline mr-2 tx-16"></i>
                Notifications
              </h6>
              <mat-list>
                <mat-list-item>
                  <div class="item-thumbnail item-thumbnail-icon">
                    <i class="mdi mdi-email-outline"></i>
                  </div>
                  <div
                    class="item-content d-flex align-items-start flex-column justify-content-center"
                  >
                    <h6 class="item-subject font-weight-normal">You received a new message</h6>
                    <p class="text-muted tx-12 mb-0">6 min ago</p>
                  </div>
                </mat-list-item>
                <mat-list-item>
                  <div class="item-thumbnail item-thumbnail-icon">
                    <i class="mdi mdi-account-outline"></i>
                  </div>
                  <div
                    class="item-content d-flex align-items-start flex-column justify-content-center"
                  >
                    <h6 class="item-subject font-weight-normal">New user registered</h6>
                    <p class="text-muted tx-12 mb-0">15 min ago</p>
                  </div>
                </mat-list-item>
                <mat-list-item>
                  <div class="item-thumbnail item-thumbnail-icon">
                    <i class="mdi mdi-alert-circle-outline"></i>
                  </div>
                  <div
                    class="item-content d-flex align-items-start flex-column justify-content-center"
                  >
                    <h6 class="item-subject font-weight-normal">System Alert</h6>
                    <p class="text-muted tx-12 mb-0">2 days ago</p>
                  </div>
                </mat-list-item>
              </mat-list>
            </mat-menu>

            <!--button mat-icon-button matTooltip="Notifications">
              <mat-icon>notifications</mat-icon>
            </button-->

            <button mat-icon-button matTooltip="My Account" [matMenuTriggerFor]="accountMenu">
              <mat-icon>account_circle</mat-icon>
            </button>
            <mat-menu #accountMenu [overlapTrigger]="false" yPosition="below">
              <button
                mat-menu-item
                data-e2e-id="loggedin-user"
                class="nav-link"
                [routerLink]="['/profile', user.username]"
                routerLinkActive="active"
              >
                <mat-icon>person</mat-icon>
                <span>My Account</span>
                <span>{{ user.username }}</span>
              </button>
              <button mat-menu-item>
                <mat-icon>help</mat-icon>
                <span>Help</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item>
                <mat-icon>exit_to_app</mat-icon>
                Logout
              </button>
            </mat-menu>
          </div>
        </mat-toolbar>

        <div style="padding: 6px">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatLine,
    TranslateModule,
    LangComponent,
    RouterLinkActive,
    NgForOf,
    UiSpacerComponent,
    MsgIconBtnComponent,
    SidenavListItemComponent,
    NgOptimizedImage,
    MatTooltip,
    MatExpansionPanel,
    MatExpansionPanelHeader,
  ],
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('snav', {static: true}) snavRef!: MatSidenav;

  @Input() user!: IUser;
  @Input() isLoggedIn!: boolean;
  private breakpointObserver = inject(BreakpointObserver);
  mobileQuery!: MediaQueryList;
  authService = inject(AuthService);
  sidenavService = inject(SidenavService);
  private readonly _themeService = inject(ThemeService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  fillerNav: Array<NavItem> = [
    {title: 'common.menu.dashboard', path: '', icon: 'dashboard'},
    {
      title: 'common.menu.uam',
      path: 'uam',
      icon: 'account',
      children: [
        {
          title: 'common.menu.users',
          path: 'uam/users',
        },
      ],
    },
    {title: 'common.menu.employees', path: 'employees', icon: 'supervisor_account'},
    {title: 'common.menu.organizations', path: 'org', icon: 'business'},
    {title: 'common.menu.finance', path: 'finance', icon: 'account_balance'}, // account_balance_wallet
    {title: 'common.menu.communications', path: 'comms', icon: 'mail_outline'},
    {title: 'common.menu.lms', path: 'lms', icon: 'cancel'},
    {title: 'common.menu.attendance', path: 'ams', icon: 'check_circle_outline'},
    {title: 'common.menu.recruitments', path: 'recruitments', icon: 'phonelink'},
    {title: 'common.menu.onboarding', path: 'onboarding', icon: 'flight'},
    {title: 'common.menu.training', path: 'training', icon: 'layers'},
    {title: 'common.menu.pm', path: 'pm', icon: 'group_work'},
    {title: 'common.menu.pms', path: 'pms', icon: 'show_chart'},
    {title: 'common.menu.cms', path: 'cms', icon: 'assignment_ind'},
    {title: 'common.menu.profile', path: 'profile', icon: 'settings_applications'},
    {title: 'common.menu.settings', path: 'settings', icon: 'settings'},
  ];

  private mobileQueryListener!: (ev: MediaQueryListEvent) => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.mobileQueryListener = (_) => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  navLinkClick() {
    if (this.mobileQuery.matches) {
      this.snavRef.close();
    }
  }

  toggleTheme(): void {
    const body = document.querySelector('body') as HTMLElement;
    if (this._themeService.isDarkMode) {
      body.classList.remove('xtra-ui-blue-dark');
      body.classList.add('xtra-ui-blue');
    } else {
      body.classList.remove('xtra-ui-blue');
      body.classList.add('xtra-ui-blue-dark');
    }
    this._themeService.isDarkMode = !this._themeService.isDarkMode;
  }

  // Use in unit tests.
  isDarkMode(): boolean {
    return this._themeService.isDarkMode;
  }

  logout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}

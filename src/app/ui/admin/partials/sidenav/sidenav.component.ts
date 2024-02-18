import { DrawerNavItem, NAV_ITEMS } from '@admin-ui/partials/sidenav/admin.menu';
import { NotificationItemComponent } from '@admin-ui/partials/sidenav/notification-item/notification-item.component';
import { SidenavListItemComponent } from '@admin-ui/partials/sidenav/sidenav-list-item/sidenav-list-item.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AsyncPipe, NgClass, NgForOf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { Component, HostBinding, Input, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLine } from '@angular/material/core';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '@data/models';
import { AuthService } from '@data/services';
import { INotification } from '@models/notification.model';
import { FlexModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LangComponent } from '@shared/components/lang/lang.component';
import { MsgIconBtnComponent } from '@shared/components/msg-icon-btn/msg-icon-btn.component';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { StateService } from '@shared/services/state.service';
import { ThemeService } from '@shared/services/theme.service';
import { ViewportService } from '@shared/services/viewport.service';
import { UiSpacerComponent } from '@ui-components/ui-spacer/ui-spacer.component';

@Component({
  selector: 'xtra-sidenav',
  template: `
    <mat-sidenav-container
      class="sidenav-container"
      (backdropClick)="closeDrawer()"
      [autosize]="false"
      [ngClass]="{ 'container-closed': !isShowing }">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="isMobile() ? 'dialog' : 'navigation'"
        [mode]="isMobile() ? 'over' : 'side'"
        [opened]="true && !isMobile()"
        [disableClose]="true">
        <mat-toolbar class="sidenav-header">
          <img
            ngSrc="./../../../../../assets/images/logo.png"
            [height]="25"
            [width]="25"
            alt="Xtra HRMS Admin Logo" />
          <span class="sidenav-header-title">Xtra HRMS (Admin)</span>
        </mat-toolbar>

        <mat-nav-list (mouseenter)="toggleSidenav()" (mouseleave)="(!isShowing)">
          @for (nav of fillerNav; track nav.title) {
            @if (!nav.items) {
              <xtra-sidenav-list-item [nav]="nav" (navLinkClick)="navLinkClick()">
                <mat-icon icon class="mr-2 flex items-center">{{ nav.icon }}</mat-icon>

                {{ nav.title | translate }}
              </xtra-sidenav-list-item>
            }
            @if (nav.items) {
              @for (navChild of nav.items; track navChild.title) {
                <mat-expansion-panel [class.mat-elevation-z0]="true">
                  <mat-expansion-panel-header>
                    @if (nav.icon) {
                      <!-- Wrapping icon and text with spans to make text truncation work -->
                      <span>
                        <mat-icon class="mr-2 flex items-center">{{ nav.icon }}</mat-icon>
                      </span>
                    }
                    {{ nav.title | translate }}
                  </mat-expansion-panel-header>
                  <mat-nav-list>
                    <a mat-list-item routerLink="{{ navChild.path }}">
                      {{ navChild.title | translate }}
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
          @if (!isMobile()) {
            <button class="toggle-button" (click)="toggleSidenav()" [class.is-flipped]="isShowing">
              <mat-icon>chevron_right</mat-icon>
            </button>
          }

          @if (isMobile()) {
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()">
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

            <!--button
              (click)="toggleTheme()"
              class="toggle-theme"
              mat-icon-button
              style="margin: 0 4px"
              matTooltip="Toggle Theme">
              <mat-icon>invert_colors</mat-icon>
            </button-->

            <button
              mat-icon-button
              (click)="toggleTheme()"
              class="theme-toggle"
              aria-label="Toggle Dark Theme"
              style="margin: 0 4px"
              matTooltip="Toggle Theme">
              <mat-icon>{{ _themeService.isDarkMode ? 'dark_mode' : 'light_mode' }}</mat-icon>
            </button>

            <xtra-lang class="flex flex-auto" matTooltip="Select Language"></xtra-lang>

            <!--notification_important-->
            <xtra-msg-icon-btn
              class="m-r-5"
              icon="notifications"
              number="5"
              [matMenuTriggerFor]="menu"
              matTooltip="Notifications"></xtra-msg-icon-btn>
            <mat-menu #menu="matMenu" class="notificationsMenu">
              <h6 class="title">
                <i class="mdi mdi-bell-outline mr-2 tx-16"></i>
                Notifications
              </h6>
              <mat-list>
                @for (notification of notifications; track notification.title) {
                  <xtra-notification-item [notification]="notification"></xtra-notification-item>
                }
              </mat-list>
            </mat-menu>

            <button
              mat-icon-button
              matTooltip="My Account"
              [matMenuTriggerFor]="accountMenu"
              fxFlex
              class="avatar-col">
              <!--<mat-icon>account_circle</mat-icon>-->
              <span class="flex items-center avatar accent-1 large">
                {{ user.username! | slice: 0 : 2 | capitalize }}
              </span>
            </button>

            <div></div>

            <mat-menu #accountMenu [overlapTrigger]="false" yPosition="below">
              <button
                mat-menu-item
                data-e2e-id="loggedin-user"
                class="nav-link"
                [routerLink]="['/profile', user.username]"
                routerLinkActive="active">
                <mat-icon>person</mat-icon>
                <span>My Account</span>
                <span class="ml-2">({{ user.username }})</span>
              </button>
              <button mat-menu-item>
                <mat-icon>help</mat-icon>
                <span>Help</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
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
    NotificationItemComponent,
    CdkOverlayOrigin,
    SlicePipe,
    NgClass,
    FlexModule,
    CapitalizePipe,
  ],
})
export class SidenavComponent {
  @ViewChild('drawer', { static: true }) snavRef!: MatSidenav;

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.isShowing;
  }

  @Input() user!: IUser;
  @Input() isLoggedIn!: boolean;
  @Input() notifications!: INotification[];

  /** If true, NavItems will not have a bold title when a child NavItem is selected
   *
   * @default false
   * */
  disableActiveItemParentStyles = false;
  /** State for the drawer */
  open = true;
  isShowing!: boolean;

  /** Automatically open the drawer on hover when closed (persistent variant only) */
  openOnHover = true;
  /** Delay in milliseconds before a hover event opens the drawer (persistent variant only)
   *
   * @default 500
   * */
  openOnHoverDelay = 500;
  /** Toggle a side border instead of shadow
   *
   * @default false
   * */
  sideBorder = false;
  /** Drawer pixel width
   *
   * @default 350
   * */
  width = 350;
  /** This is true whenever the drawer is in a collapsed state & its variant has been transitioned to temporary. */
  hasCollapsedTransitionToTemporary = false;

  hoverDelayTimeout: any;

  authService = inject(AuthService);
  protected readonly _themeService = inject(ThemeService);
  protected readonly _stateService = inject(StateService);
  private readonly _viewportService = inject(ViewportService);

  fillerNav: Array<DrawerNavItem> = NAV_ITEMS;

  constructor() {
    this.isShowing = !this._viewportService.isSmall();
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  navLinkClick() {
    /*if (this.mobileQuery.matches) {
      this.snavRef.close();
    }*/
  }

  isMobile(): boolean {
    return this._viewportService.isSmall();
  }

  closeDrawer(): void {
    this._stateService.setDrawerOpen(false);
  }

  openDrawer(): void {
    this._stateService.setDrawerOpen(true);
  }

  isOpened(): boolean {
    return this._stateService.getDrawerOpen();
  }

  clickMenuButton(): void {
    this._stateService.setDrawerOpen(!this._stateService.getDrawerOpen());
  }

  toggleTheme(): void {
    const body = document.querySelector('body') as HTMLElement;
    if (this._themeService.isDarkMode) {
      body.classList.remove('xtra-dark');
      body.classList.add('xtra-light');
    } else {
      body.classList.remove('xtra-light');
      body.classList.add('xtra-dark');
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
}

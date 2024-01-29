import {ChangeDetectorRef, Component, inject, Input, OnDestroy, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {AsyncPipe, NgForOf} from '@angular/common';
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
        <mat-toolbar>Menu</mat-toolbar>

        <mat-nav-list>
          @for (nav of fillerNav; track nav.title) {
            <a
              mat-list-item
              routerLinkActive="active-link"
              [routerLink]="nav.path"
              (click)="navLinkClick()"
            >
              @if (nav.icon) {
                <mat-icon>{{ nav.icon }}</mat-icon>
              }
              <span class="nav-caption">{{ nav.title | translate }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
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
          <span class="toolbar-item" style="cursor: pointer">
            {{ 'common.app-title' | translate }}
          </span>

          <mat-divider></mat-divider>

          <xtra-lang></xtra-lang>

          <mat-list-item [matMenuTriggerFor]="menu">
            <mat-icon>unfold_more</mat-icon>
            <a mat-line>Example</a>
          </mat-list-item>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>View profile</button>
            <button mat-menu-item>Add contact</button>
          </mat-menu>
        </mat-toolbar>

        <div style="padding: 6px">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      img {
        width: 10rem;
      }

      .toolbar {
        display: flex;
      }

      .toolbar-item {
        font-size: 2rem;
        width: 30%;
        margin-right: 1rem;
      }
    `,
  ],
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
  ],
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('snav', {static: true}) snavRef!: MatSidenav;

  @Input() user!: IUser;
  @Input() isLoggedIn!: boolean;
  private breakpointObserver = inject(BreakpointObserver);
  mobileQuery!: MediaQueryList;
  authService = inject(AuthService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  fillerNav: Array<{
    title: string;
    path: string;
    icon?: string;
  }> = [
    {title: 'common.menu.dashboard', path: '', icon: 'home'},
    {title: 'common.menu.uam', path: 'uam'},
    {title: 'common.menu.employees', path: 'employees'},
    {title: 'common.menu.organizations', path: 'org'},
    {title: 'common.menu.finance', path: 'finance', icon: 'account_balance'},
    {title: 'common.menu.communications', path: 'comms'},
    {title: 'common.menu.lms', path: 'lms'},
    {title: 'common.menu.attendance', path: 'ams'},
    {title: 'common.menu.recruitments', path: 'recruitments'},
    {title: 'common.menu.onboarding', path: 'onboarding'},
    {title: 'common.menu.training', path: 'training'},
    {title: 'common.menu.cms', path: 'cms', icon: 'assignment_ind'},
    {title: 'common.menu.profile', path: 'profile'},
    {title: 'common.menu.settings', path: 'settings'},
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

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  logout() {
    this.authService.logOut();
  }
}

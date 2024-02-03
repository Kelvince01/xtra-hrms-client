import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatTooltip} from '@angular/material/tooltip';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatLine} from '@angular/material/core';

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
          <a mat-list-item href="#">Link 1</a>
          <a mat-list-item href="#">Link 2</a>
          <a mat-list-item href="#">Link 3</a>
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
          <mat-expansion-panel [class.mat-elevation-z0]="true" dense>
            <mat-expansion-panel-header>Privacy</mat-expansion-panel-header>
            <mat-nav-list dense>
              <a mat-list-item routerLink="#">
                <mat-icon>person_add</mat-icon>
                Partnership Request
              </a>
              <a mat-list-item routerLink="#">
                <mat-icon>visibility</mat-icon>
                Profile Visibility
              </a>
            </mat-nav-list>
          </mat-expansion-panel>

          <mat-list-item [matMenuTriggerFor]="menu">
            <mat-icon>unfold_more</mat-icon>
            <a mat-line>Example</a>
          </mat-list-item>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>View profile</button>
            <button mat-menu-item>Add contact</button>
          </mat-menu>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <!--mat-toolbar color="primary">
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
          <span>xtra-hrms-client</span>
        </mat-toolbar-->

        <mat-toolbar color="accent">
          <button mat-icon-button matTooltip="Application Menu" (click)="drawer.toggle()">
            <mat-icon>settings</mat-icon>
          </button>
          Account Settings
          <span style="flex: 1 1 auto;"></span>
          <div>
            <button mat-icon-button matTooltip="Switch Apps">
              <mat-icon>apps</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Notifications">
              <mat-icon>notifications</mat-icon>
            </button>
            <button mat-icon-button matTooltip="My Account" [matMenuTriggerFor]="accountMenu">
              <mat-icon>account_circle</mat-icon>
            </button>
            <mat-menu #accountMenu [overlapTrigger]="false" yPosition="below">
              <button mat-menu-item routerLink="#">
                <mat-icon>person</mat-icon>
                <span>My Account</span>
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
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
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

  `,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatTooltip,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatLine,
  ],
})
export class SidenavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}

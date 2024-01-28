import {Component, inject, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserModel} from '@data/models';
import {RouterLink} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
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
          <a mat-list-item routerLink="/">Dashboard</a>
          <a mat-list-item routerLink="/employees">Employee</a>
          <a mat-list-item routerLink="/uam/users">UAM</a>
          <a mat-list-item routerLink="/home">
            <mat-icon>home</mat-icon>
            <span class="nav-caption">Home</span>
          </a>
          <a mat-list-item routerLink="/owner">
            <mat-icon>assignment_ind</mat-icon>
            <span class="nav-caption">Owner Actions</span>
          </a>
          <a mat-list-item routerLink="#">
            <mat-icon>account_balance</mat-icon>
            <span class="nav-caption">Account Actions</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
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
          <span>Xtra HRMS (Client)</span>

          <mat-list-item [matMenuTriggerFor]="menu">
            <mat-icon>unfold_more</mat-icon>
            <a mat-line>Example</a>
          </mat-list-item>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>View profile</button>
            <button mat-menu-item>Add contact</button>
          </mat-menu>
        </mat-toolbar>
        <ng-content></ng-content>
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
  ],
})
export class SidenavComponent {
  @Input() user!: UserModel;
  @Input() isLoggedIn!: boolean;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}

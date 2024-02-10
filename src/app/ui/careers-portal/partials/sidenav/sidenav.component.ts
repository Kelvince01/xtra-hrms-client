import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {MatIcon} from '@angular/material/icon';
import {SidenavLinkComponent} from './sidenav-link.component';

@Component({
  selector: 'xtra-sidenav',
  standalone: true,
  imports: [MatIcon, SidenavLinkComponent],
  template: `
    <div class="sidenav-body-container">
      <div class="sidenav-body">
        <h1>Careers Portal</h1>

        <xtra-sidenav-link routerLink="/home">
          <mat-icon icon>home</mat-icon>

          Home
        </xtra-sidenav-link>

        <xtra-sidenav-link routerLink="/profile">
          <mat-icon icon>account_circle</mat-icon>

          Profile
        </xtra-sidenav-link>

        <xtra-sidenav-link routerLink="screen-1">
          <mat-icon icon>screen_share</mat-icon>

          Screen 1
        </xtra-sidenav-link>

        <xtra-sidenav-link routerLink="screen-2">
          <mat-icon icon>screen_share</mat-icon>

          Screen 2
        </xtra-sidenav-link>

        <xtra-sidenav-link routerLink="/settings">
          <mat-icon icon>settings</mat-icon>

          Settings
        </xtra-sidenav-link>
      </div>
    </div>

    <button
      class="toggle-button"
      (click)="this.sidenavService.toggleSidenav()"
      [class.is-flipped]="sidenavService.isExpanded"
    >
      <mat-icon>chevron_right</mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        height: 100vh;

        width: var(--sidenav-collapsed-width);

        &.is-expanded {
          width: var(--sidenav-width);
        }

        box-sizing: border-box;

        // makes the sidenav stay in place, even when content is scrollable
        position: sticky;
        top: 0;

        background-color: rgb(237, 241, 243);

        border-right: 2px solid rgb(192, 192, 192);

        transition: width 300ms cubic-bezier(0.02, 0.68, 0.63, 0.98);
      }

      .sidenav-body-container {
        overflow-y: auto;

        height: 100%;

        padding: 16px;

        box-sizing: border-box;
      }

      .sidenav-body {
        width: 100%;

        overflow-x: hidden;
      }

      .toggle-button {
        display: flex;

        align-items: center;
        justify-content: center;

        $size: 25px;
        width: $size;
        height: $size;
        margin: 0;
        padding: 0;

        position: absolute;
        top: 48px;
        // the -2px is to get the alignment just right *chefs kiss*
        right: calc($size / -2) - 2px;

        border: 1px solid gray;
        border-radius: 50%;

        background-color: white;

        cursor: pointer;

        &:hover {
          border: 2px solid rgb(36, 82, 231);
        }

        &.is-flipped {
          transform: rotate(-180deg);
        }

        mat-icon {
          font-size: 1.5em;

          width: fit-content;
          height: fit-content;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  constructor(public sidenavService: SidenavService) {}

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }
}

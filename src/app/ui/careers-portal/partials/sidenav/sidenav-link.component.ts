import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'xtra-sidenav-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="routerLink"
      routerLinkActive="active"
      [routerLinkActiveOptions]="routerLinkActiveOptions"
    >
      <!-- Wrapping icon and text with spans to make text truncation work -->
      <span>
        <ng-content select="[icon]"></ng-content>
      </span>

      <span class="text-container">
        <ng-content></ng-content>
      </span>
    </a>
  `,
  styles: [
    `
      a {
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: flex-start;

        gap: 8px;

        box-sizing: border-box;

        padding: 16px;

        // 32px is just a bit of a margin to make sure the link is smaller than the sidenav
        min-width: calc(var(--min-expanded-sidenav-width) - 32px);

        text-decoration: none;
        color: #000;

        transition: background-color 75ms ease-out;

        border-radius: 4px;

        // change overflowing text to ellipsis
        .text-container {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover {
          background-color: #deebff;
        }

        &.active {
          background-color: #c1daff;
          font-weight: bold;
          color: rgb(36, 82, 231);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavLinkComponent {
  @Input()
  routerLink?: string;

  @Input()
  routerLinkActiveOptions: {exact: boolean} = {exact: true};
}

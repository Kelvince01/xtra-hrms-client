import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatListItem} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {NavItem} from '@admin-ui/partials/sidenav/admin.menu';

@Component({
  selector: 'xtra-sidenav-list-item',
  template: `
    <a
      mat-list-item
      routerLinkActive="active"
      [routerLinkActiveOptions]="routerLinkActiveOptions"
      [routerLink]="nav.path"
      (click)="navLinkClicked()"
    >
      @if (nav.icon) {
        <!-- Wrapping icon and text with spans to make text truncation work -->
        <span>
          <ng-content select="[icon]"></ng-content>
        </span>
      }

      <span class="text-container">
        <ng-content></ng-content>
      </span>
    </a>
  `,
  styleUrls: ['./sidenav-list-item.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIcon, MatListItem, TranslateModule],
})
export class SidenavListItemComponent {
  @Input()
  nav!: NavItem;

  @Output() navLinkClick = new EventEmitter();

  @Input()
  routerLinkActiveOptions: {exact: boolean} = {exact: true};

  navLinkClicked() {
    this.navLinkClick.emit();
  }
}

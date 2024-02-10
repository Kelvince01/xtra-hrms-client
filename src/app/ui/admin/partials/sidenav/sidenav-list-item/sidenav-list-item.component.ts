/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatListItem} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {DrawerNavItem} from '@admin-ui/partials/sidenav/admin.menu';
import {MatDivider} from '@angular/material/divider';

type DividerType = 'full' | 'partial' | undefined;

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
        <span class="flex items-center">
          <ng-content select="[icon]"></ng-content>
        </span>
      }

      <span class="text-container">
        <ng-content></ng-content>
      </span>

      @if (chevron) {
        <mat-icon class="xtra-ui-chevron">chevron_right</mat-icon>
      }
    </a>

    @if (divider) {
      <mat-divider
        class="xtra-ui-info-list-item-divider"
        [class.xtra-ui-info-list-item-partial-divider]="divider === 'partial'"
      ></mat-divider>
    }
  `,
  styleUrls: ['./sidenav-list-item.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIcon, MatListItem, TranslateModule, MatDivider],
})
export class SidenavListItemComponent {
  @Input()
  nav!: DrawerNavItem;
  /** Add a chevron icon on the right
   *
   * @default false
   * */
  @Input() chevron = false;
  /** Show a row separator below the row.  Can be `partial` | `full`
   *
   * `partial` - Divider does not expand full width of the ListItem
   *
   * `full`- Divider spans full width of the ListItem
   * */
  @Input() divider: DividerType;

  @Output() navLinkClick = new EventEmitter();

  @Input()
  routerLinkActiveOptions: {exact: boolean} = {exact: true};

  navLinkClicked() {
    this.navLinkClick.emit();
  }
}

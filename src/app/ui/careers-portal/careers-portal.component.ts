import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidenavComponent} from './partials/sidenav/sidenav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'xtra-careers-portal',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  template: `
    <xtra-sidenav></xtra-sidenav>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        min-height: 100vh;

        display: flex;
        flex-direction: row;
      }

      .content {
        flex-grow: 1;

        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPortalComponent {}

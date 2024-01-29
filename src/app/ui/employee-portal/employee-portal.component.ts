import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidenavComponent} from './partials/sidenav/sidenav.component';

@Component({
  selector: 'xtra-employee-portal',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  template: `
    <xtra-sidenav>
      <router-outlet />
    </xtra-sidenav>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePortalComponent {}

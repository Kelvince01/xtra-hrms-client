import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidenavComponent} from './partials/sidenav/sidenav.component';
import {SeoService} from '@core/services';

@Component({
  selector: 'xtra-finance-portal',
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
export class FinancePortalComponent {
  seoService = inject(SeoService);

  constructor() {
    this.seoService.addSeoData();
  }
}

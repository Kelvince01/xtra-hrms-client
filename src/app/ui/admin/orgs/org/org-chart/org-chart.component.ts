import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-org-chart',
  standalone: true,
  imports: [],
  template: `
    <p>org-chart works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgChartComponent {}

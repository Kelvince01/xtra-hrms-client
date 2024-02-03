import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-dashboard',
  standalone: true,
  imports: [],
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}

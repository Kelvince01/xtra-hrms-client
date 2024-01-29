import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-hr-detail-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      hr-detail-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrDetailPageComponent {

}

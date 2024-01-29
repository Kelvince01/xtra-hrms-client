import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-hr-detail-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      hr-detail-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrDetailListComponent {

}

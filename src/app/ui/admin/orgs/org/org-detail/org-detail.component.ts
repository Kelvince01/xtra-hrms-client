import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-org-detail',
  standalone: true,
  imports: [],
  template: `
    <p>
      org-detail works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgDetailComponent {

}

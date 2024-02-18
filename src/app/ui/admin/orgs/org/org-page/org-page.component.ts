import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-org-page',
  standalone: true,
  imports: [],
  template: `
    <p>org-page works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgPageComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-branch-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      branch-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchPageComponent {

}

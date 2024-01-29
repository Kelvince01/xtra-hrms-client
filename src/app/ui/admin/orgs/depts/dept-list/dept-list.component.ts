import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-dept-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      dept-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptListComponent {

}

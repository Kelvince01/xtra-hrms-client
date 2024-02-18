import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-dept-page',
  standalone: true,
  imports: [],
  template: `
    <p>dept-page works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeptPageComponent {}

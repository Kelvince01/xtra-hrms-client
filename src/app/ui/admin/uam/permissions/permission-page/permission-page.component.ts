import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-permission-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      permission-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionPageComponent {

}

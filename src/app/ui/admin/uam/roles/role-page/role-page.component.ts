import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-role-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      role-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolePageComponent {

}

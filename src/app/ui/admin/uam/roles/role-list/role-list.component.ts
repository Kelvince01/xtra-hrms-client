import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-role-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      role-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleListComponent {

}

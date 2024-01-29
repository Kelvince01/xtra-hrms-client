import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-permission-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      permission-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionListComponent {

}

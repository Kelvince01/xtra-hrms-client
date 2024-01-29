import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-permission-assign',
  standalone: true,
  imports: [],
  template: `
    <p>
      permission-assign works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionAssignComponent {

}

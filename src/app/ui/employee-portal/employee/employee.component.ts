import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-employee',
  standalone: true,
  imports: [],
  template: `
    <p>
      employee works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {

}

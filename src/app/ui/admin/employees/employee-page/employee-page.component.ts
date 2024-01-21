import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-employee-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      employee-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePageComponent {

}

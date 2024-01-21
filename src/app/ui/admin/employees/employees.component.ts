import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-employees',
  standalone: true,
  imports: [],
  template: `
    <p>
      employees works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent {

}

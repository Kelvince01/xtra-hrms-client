import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-employee-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      employee-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {

}

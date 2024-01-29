import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-trainings',
  standalone: true,
  imports: [],
  template: `
    <p>
      trainings works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingsComponent {

}

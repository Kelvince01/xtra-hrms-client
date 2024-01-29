import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-lms',
  standalone: true,
  imports: [],
  template: `
    <p>
      lms works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LmsComponent {

}

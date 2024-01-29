import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-ams',
  standalone: true,
  imports: [],
  template: `
    <p>
      ams works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmsComponent {

}

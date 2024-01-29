import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-pms',
  standalone: true,
  imports: [],
  template: `
    <p>
      pms works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PmsComponent {

}

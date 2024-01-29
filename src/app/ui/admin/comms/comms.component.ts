import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-comms',
  standalone: true,
  imports: [],
  template: `
    <p>
      comms works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommsComponent {

}

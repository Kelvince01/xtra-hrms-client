import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-user-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      user-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {

}

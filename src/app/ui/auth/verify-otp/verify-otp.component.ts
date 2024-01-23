import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-verify-otp',
  standalone: true,
  imports: [],
  template: `
    <p>
      verify-otp works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyOtpComponent {

}

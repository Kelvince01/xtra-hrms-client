import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-onboarding',
  standalone: true,
  imports: [],
  template: `
    <p>
      onboarding works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent {

}

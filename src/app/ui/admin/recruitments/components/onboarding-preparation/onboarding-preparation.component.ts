import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-onboarding-preparation',
  standalone: true,
  imports: [],
  template: `
    <p>Onboarding preparation</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingPreparationComponent {
  @Input() candidateId!: number;
}

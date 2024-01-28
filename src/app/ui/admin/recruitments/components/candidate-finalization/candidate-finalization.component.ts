import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-candidate-finalization',
  standalone: true,
  imports: [],
  template: `
    <p>Candidate finalization</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateFinalizationComponent {
  @Input() candidateId!: number;
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-interview-feedback',
  standalone: true,
  imports: [],
  template: `
    <p>Interview feedback</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewFeedbackComponent {
  @Input() candidateId!: number;
}

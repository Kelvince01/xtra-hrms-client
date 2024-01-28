import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-interview-preparation',
  standalone: true,
  imports: [],
  template: `
    <p>Interview preparation</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewPreparationComponent {
  @Input() candidateId!: number;
}

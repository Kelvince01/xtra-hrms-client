import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-cv-evaluation',
  standalone: true,
  imports: [],
  template: `
    <p>CV evaluation</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEvaluationComponent {
  @Input() candidateId!: number;
}

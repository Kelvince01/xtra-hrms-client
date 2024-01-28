import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-rejection-letter',
  standalone: true,
  imports: [],
  template: `
    <p>Rejection letter</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectionLetterComponent {
  @Input() candidateId!: number;
}

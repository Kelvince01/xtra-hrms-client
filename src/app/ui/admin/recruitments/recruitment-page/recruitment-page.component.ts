import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-recruitment-page',
  standalone: true,
  imports: [],
  template: `
    <p>recruitment-page works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentPageComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-recruitment-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      recruitment-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitmentListComponent {

}

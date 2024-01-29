import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-cms',
  standalone: true,
  imports: [],
  template: `
    <p>
      cms works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsComponent {

}

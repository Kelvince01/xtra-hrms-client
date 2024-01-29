import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-finance',
  standalone: true,
  imports: [],
  template: `
    <p>
      finance works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinanceComponent {

}

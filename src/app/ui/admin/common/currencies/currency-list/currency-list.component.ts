import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-currency-list',
  standalone: true,
  imports: [],
  template: `
    <p>currency-list works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyListComponent {}

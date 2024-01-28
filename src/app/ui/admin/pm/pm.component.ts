import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'xtra-pm',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmComponent {}

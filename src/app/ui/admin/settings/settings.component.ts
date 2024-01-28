import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-settings',
  standalone: true,
  imports: [],
  template: `
    <p>
      settings works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

}

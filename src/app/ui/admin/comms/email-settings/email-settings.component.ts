import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ListComponent } from '@admin-ui/comms/email-settings/list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xtra-email-settings',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, ListComponent],
  template: `
    <xtra-email-settings-list />
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSettingsComponent {}

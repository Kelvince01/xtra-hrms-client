import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {ListComponent} from '@admin-ui/comms/email-settings/list/list.component';

@Component({
  selector: 'xtra-email-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, ListComponent],
  template: `
    <xtra-email-settings-list />
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSettingsComponent {}

import { Component, inject } from '@angular/core';

import { ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmailSettingsService } from '@data/services/comms.service';
import { IEmailSetting } from '@models/communication.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card class="email-settings-card">
      <mat-card-header>
        <mat-card-title>{{ emailSetting.name }}</mat-card-title>
        <mat-card-subtitle>{{ emailSetting.sender_email }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>This card indeterminates progress bar.</p>
        <p>{{ emailSetting.subject }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="edit(emailSetting)">EDIT</button>
        <button mat-button (click)="delete(emailSetting)">DELETE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .email-settings-card {
        max-width: 400px;
      }
    `,
  ],
  providers: [EmailSettingsService],
})
export class PageComponent {
  @Input({ required: true }) emailSetting!: IEmailSetting;
  service = inject(EmailSettingsService);

  title = 'Add Project';

  constructor(entityService: EmailSettingsService) {}

  edit(object: IEmailSetting): void {
    this.service.update(object);
  }

  delete(object: IEmailSetting): void {
    // this.service.delete(object.id);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'xtra-alert',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  template: `
    <div class="alert" role="alert">
      <h4 class="alert-heading">
        <mat-icon>thumb_up</mat-icon>
        Well done!
      </h4>
      <button mat-icon-button aria-label="Close" class="alert-close">
        <mat-icon>close</mat-icon>
      </button>
      <p class="alert-message">
        You did a great job! To get your reward,
        <a href="#" class="alert-link">click here</a>
        .
      </p>
      <hr />
      <p class="alert-footer">Your reward will be credited to your account within 24 Hour.</p>
    </div>
  `,
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {}

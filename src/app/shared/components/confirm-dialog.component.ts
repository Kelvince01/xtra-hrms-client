import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'xtra-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
  template: `
    <div class="header">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <button mat-icon-button [mat-dialog-close]="false">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions [align]="'end'">
      <button mat-raised-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Confirm</button>
    </div>
  `,
  styles: `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}

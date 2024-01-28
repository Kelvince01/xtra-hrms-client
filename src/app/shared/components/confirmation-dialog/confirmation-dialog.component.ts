import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-confirmation-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog [open]="isConfirmationOpen">
      Are you sure you want to perform this action?

      <button (click)="isConfirmationOpen = false">Cancel</button>
      <button (click)="isConfirmationOpen = false">Confirm</button>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  isConfirmationOpen = true;
}

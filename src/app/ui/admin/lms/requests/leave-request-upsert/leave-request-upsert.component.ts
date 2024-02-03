import {ChangeDetectionStrategy, Component, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeaveRequestItemComponent} from '../leave-request-item/leave-request-item.component';

@Component({
  selector: 'xtra-leave-request-upsert',
  standalone: true,
  imports: [CommonModule, LeaveRequestItemComponent],
  template: `
    @if (!inEditMode) {
      <button (click)="onEdit()">Edit</button>
    }

    @if (inEditMode) {
      <button (click)="onCancel()">Cancel</button>
      <button (click)="onSave()">Save</button>
    }

    <xtra-leave-request-item #leaveRequestForm [inEditMode]="inEditMode"></xtra-leave-request-item>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveRequestUpsertComponent {
  @ViewChildren('leaveRequestForm')
  forms!: QueryList<any>;

  inEditMode: boolean = false;

  onEdit(): void {
    this.inEditMode = true;
  }

  onCancel(): void {
    this.forms.forEach((c) => c.cancel());
    this.inEditMode = false;
  }

  onSave(): void {
    this.forms.forEach((c) => c.save());
    this.inEditMode = false;
  }
}

import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Field} from '@stores/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'xtra-input',
  standalone: true,
  template: `
    <mat-form-field [formGroup]="group" appearance="outline">
      @if (field.label) {
        <mat-label>{{ field.label }}</mat-label>
      }
      <input
        [formControlName]="field.name"
        [attr.placeholder]="field.placeholder"
        matInput
        [attr.type]="field.attrs?.type || 'text'"
      />
      @if (field.value) {
        <button matSuffix mat-icon-button aria-label="Clear" (click)="field.value = ''">
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  imports: [ReactiveFormsModule, MatInputModule, MatIconButton, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}

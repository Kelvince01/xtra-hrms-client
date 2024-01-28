import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Field} from '@stores/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'xtra-textarea',
  standalone: true,
  template: `
    <mat-form-field [formGroup]="group" appearance="outline">
      <textarea
        matInput
        [attr.rows]="field.attrs?.rows || 5"
        [formControlName]="field.name"
        [attr.placeholder]="field.placeholder"
      ></textarea>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  imports: [ReactiveFormsModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Field} from '@stores/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'xtra-password',
  standalone: true,
  imports: [MatFormField, MatInput, ReactiveFormsModule, NgClass, NgIf],
  template: `
    <mat-form-field [formGroup]="group" appearance="outline">
      <input
        [formControlName]="field.name"
        [attr.placeholder]="field.placeholder"
        matInput
        [attr.type]="'password'"
      />
      <div class="text-red-400 text-sm" *ngIf="passwordFormField?.dirty">
        <span
          class="block"
          [ngClass]="{'text-primary': passwordFormField?.value?.match('^(?=.*[A-Z])')}"
        >
          At least one uppercase letter.
        </span>
        <span
          class="block"
          [ngClass]="{'text-primary': passwordFormField?.value?.match('(?=.*[a-z])')}"
        >
          At least one lowercase letter.
        </span>
        <span
          class="block"
          [ngClass]="{'text-primary': passwordFormField?.value?.match('(.*[0-9].*)')}"
        >
          At least one digit.
        </span>
        <span
          class="block"
          [ngClass]="{'text-primary': passwordFormField?.value?.match('(?=.*[!@#$%^&*])')}"
        >
          At least one special character.
        </span>
        <span class="block" [ngClass]="{'text-primary': passwordFormField?.value?.match('.{8,}')}">
          At least 8 characters long.
        </span>
      </div>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;

  get passwordFormField() {
    return this.group.get('password');
  }
}

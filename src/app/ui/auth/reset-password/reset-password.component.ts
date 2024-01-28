import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChangePassword} from '@data/models';
import {ControlsOf, createEqualsValidator, upperLowerSymbolNumberRegex} from '@shared/utils';
import {FormActionDirective} from '@ngneat/error-tailor';

@Component({
  selector: 'xtra-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormActionDirective],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Change Password</h5>
        <p class="card-text">Fill in the form below and click submit to update your password.</p>
        <form class="form-group" [formGroup]="formGroup" (ngSubmit)="onSubmit()" errorTailor>
          <input
            class="form-control"
            formControlName="currentPassword"
            placeholder="Current Password"
            type="password"
          />
          <input
            class="form-control mt-2"
            formControlName="newPassword"
            placeholder="New Password"
            type="password"
          />
          <input
            class="form-control mt-2"
            formControlName="confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          <button class="btn btn-primary mt-2" type="submit">Submit</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }

      .card {
        width: 100%;
      }

      .control-error {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 12px;
        color: #dc3545;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  formGroup: FormGroup<ControlsOf<ChangePassword>>;

  constructor(formBuilder: NonNullableFormBuilder) {
    const validators = [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(upperLowerSymbolNumberRegex),
    ];

    const currentPassword = formBuilder.control('', validators);
    const newPassword = formBuilder.control('', validators);
    const confirmPassword = formBuilder.control('', validators);

    this.formGroup = formBuilder.group<ControlsOf<ChangePassword>>(
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        validators: createEqualsValidator(newPassword, confirmPassword),
      },
    );
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}

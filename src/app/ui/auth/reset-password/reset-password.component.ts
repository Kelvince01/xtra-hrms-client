import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlsOf, createEqualsValidator, upperLowerSymbolNumberRegex} from '@shared/utils';
import {FormActionDirective} from '@ngneat/error-tailor';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@data/services';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {IResetPassword} from '@data/models/accounts.model';
import {PASSWORD_VALIDATION_FN} from './providers/password-providers';
import {advancedPasswordValidator} from './validators/advanced-password-validator';
import {PasswordStrengthDirective} from './directives/password-strength.directive';

@Component({
  selector: 'xtra-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormActionDirective,
    MatInput,
    MatFormField,
    MatButton,
    PasswordStrengthDirective,
  ],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Change Password</h5>
        <p class="card-text">Fill in the form below and click submit to update your password.</p>
        <form class="form-group" [formGroup]="formGroup" (ngSubmit)="onSubmit()" errorTailor>
          <mat-form-field appearance="outline">
            <input
              matInput
              formControlName="old_password"
              placeholder="Current Password"
              type="password"
            />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <input
              matInput
              class="form-control mt-2"
              formControlName="new_password"
              placeholder="New Password"
              autocomplete="password"
              type="password"
            />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <input
              matInput
              class="form-control mt-2"
              formControlName="confirm_password"
              placeholder="Confirm Password"
              type="password"
            />
          </mat-form-field>
          <button mat-button class="mt-2" type="submit">Submit</button>
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
  providers: [
    {
      provide: PASSWORD_VALIDATION_FN,
      useValue: advancedPasswordValidator,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  formGroup: FormGroup<ControlsOf<IResetPassword>>;
  loading = false;
  submitted = false;
  forbiddenEmails: any;
  errorMessage: string = '';
  successMessage: string = '';
  IsvalidForm = true;

  constructor(
    formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private toastr: ToastrService,
  ) {
    const validators = [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(upperLowerSymbolNumberRegex),
    ];

    const old_password = formBuilder.control('', validators);
    const new_password = formBuilder.control('', validators);
    const confirm_password = formBuilder.control('', validators);

    this.formGroup = formBuilder.group<ControlsOf<IResetPassword>>(
      {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      },
      {
        validators: createEqualsValidator(new_password, confirm_password),
      },
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.toastr.clear();

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      this.IsvalidForm = false;
      return;
    }
    this.IsvalidForm = true;

    console.log(this.formGroup.value);
    this.loading = true;
    this.accountService
      .resetPassword({
        old_password: this.f['old_password'].value,
        new_password: this.f['new_password'].value,
        confirm_password: this.f['confirm_password'].value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.formGroup.reset();
          this.successMessage = 'Reset password link send to email sucessfully.';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['sign-in']);
          }, 3000);
          this.toastr.success('Password reset successful, you can now login');
          this.router.navigate(['../sign-in'], {relativeTo: this.route});
        },
        error: (error) => {
          this.toastr.error(error);
          this.loading = false;
          if (error.error.message) {
            this.errorMessage = error.error.message;
          }
        },
      });
  }
}

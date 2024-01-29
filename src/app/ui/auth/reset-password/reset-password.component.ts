import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChangePassword} from '@data/models';
import {ControlsOf, createEqualsValidator, upperLowerSymbolNumberRegex} from '@shared/utils';
import {FormActionDirective} from '@ngneat/error-tailor';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@data/services';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'xtra-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormActionDirective, MatInput, MatFormField, MatButton],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Change Password</h5>
        <p class="card-text">Fill in the form below and click submit to update your password.</p>
        <form class="form-group" [formGroup]="formGroup" (ngSubmit)="onSubmit()" errorTailor>
          <mat-form-field appearance="outline">
            <input
              matInput
              formControlName="currentPassword"
              placeholder="Current Password"
              type="password"
            />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <input
              matInput
              class="form-control mt-2"
              formControlName="newPassword"
              placeholder="New Password"
              type="password"
            />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <input
              matInput
              class="form-control mt-2"
              formControlName="confirmPassword"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  formGroup: FormGroup<ControlsOf<ChangePassword>>;
  loading = false;
  submitted = false;

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
      return;
    }

    console.log(this.formGroup.value);
    this.loading = true;
    this.accountService
      .resetPassword({
        old_password: this.f['currentPassword'].value,
        new_password: this.f['newPassword'].value,
        confirm_password: this.f['confirmPassword'].value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('Password reset successful, you can now login');
          this.router.navigate(['../sign-in'], {relativeTo: this.route});
        },
        error: (error) => {
          this.toastr.error(error);
          this.loading = false;
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormProvider } from '@core/base/form-provider';
import { ControlErrorStateMatcher } from '@core/error-matchers/control-error-state-matcher';

@Component({
  selector: 'xtra-user-contact-details',
  template: `
    <form [formGroup]="form" class="amsf-form">
      <mat-form-field appearance="fill">
        <mat-label>First Name</mat-label>
        <input
          matInput
          [formControl]="firstNameFormControl"
          [errorStateMatcher]="matcher"
          autocomplete="on"
          minlength="2"
          maxlength="20" />
        @if (firstNameFormControl.hasError('required')) {
          <mat-error>
            First Name is
            <strong>required</strong>
          </mat-error>
        }
        @if (firstNameFormControl.hasError('minlength')) {
          <mat-error>
            First Name needs to have at least
            <strong>2 characters</strong>
          </mat-error>
        }
        @if (firstNameFormControl.hasError('maxlength')) {
          <mat-error>
            First Name needs to have max
            <strong>20 characters</strong>
          </mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Last Name</mat-label>
        <input
          matInput
          [formControl]="lastNameFormControl"
          [errorStateMatcher]="matcher"
          autocomplete="on"
          minlength="2"
          maxlength="30" />
        @if (lastNameFormControl.hasError('required')) {
          <mat-error>
            Last Name is
            <strong>required</strong>
          </mat-error>
        }
        @if (lastNameFormControl.hasError('minlength')) {
          <mat-error>
            Last Name needs to have at least
            <strong>2 characters</strong>
          </mat-error>
        }
        @if (lastNameFormControl.hasError('maxlength')) {
          <mat-error>
            Last Name needs to have max
            <strong>30 characters</strong>
          </mat-error>
        }
      </mat-form-field>
      <div class="amsf-form__actions amsf-form__actions--flex-end">
        <button
          mat-raised-button
          type="button"
          color="primary"
          (click)="next()"
          [disabled]="form.invalid">
          Next
        </button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  styles: [
    `
      .amsf-form {
        display: flex;
        flex-direction: column;
        padding: 1rem;

        &__group {
          display: flex;
          flex-direction: column;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;

          &--flex-end {
            justify-content: flex-end;
          }
        }
      }
    `,
  ],
})
export class ContactDetailsComponent implements OnInit {
  public form!: FormGroup;
  public matcher = new ControlErrorStateMatcher();

  public get firstNameFormControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  public get lastNameFormControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  constructor(
    private formProvider: FormProvider,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.form = this.formProvider?.getForm().get('contact') as FormGroup;
  }

  public next(): void {
    if (this.form.valid) {
      this.router.navigateByUrl('/uam/users/add/account');
    }
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormProvider } from '@core/base/form-provider';
import { ControlErrorStateMatcher } from '@core/error-matchers/control-error-state-matcher';

@Component({
  selector: 'xtra-user-account',
  template: `
    <form [formGroup]="form" class="amsf-form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input
          matInput
          [formControl]="emailFormControl"
          [errorStateMatcher]="matcher"
          placeholder="Ex. pat@example.com"
          autocomplete="on" />
        @if (emailFormControl.hasError('email') && !emailFormControl.hasError('required')) {
          <mat-error>Please enter a valid email address</mat-error>
        }
        @if (emailFormControl.hasError('required')) {
          <mat-error>
            Email is
            <strong>required</strong>
          </mat-error>
        }
      </mat-form-field>
      <div formGroupName="password" class="amsf-form__group">
        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input
            matInput
            [formControl]="passwordFormControl"
            [errorStateMatcher]="matcher"
            type="password"
            autocomplete="on"
            minlength="2"
            maxlength="20" />
          @if (passwordFormControl.hasError('required')) {
            <mat-error>
              Password is
              <strong>required</strong>
            </mat-error>
          }
          @if (passwordFormControl.hasError('minlength')) {
            <mat-error>
              Password needs to have at least
              <strong>2 characters</strong>
            </mat-error>
          }
          @if (passwordFormControl.hasError('maxlength')) {
            <mat-error>
              Password needs to have max
              <strong>20 characters</strong>
            </mat-error>
          }
          @if (passwordFormControl.hasError('strong')) {
            <mat-error>
              Password needs to contain at least one
              <strong>number, lower letter and upper letter</strong>
            </mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Confirm Password</mat-label>
          <input
            matInput
            [formControl]="confirmPasswordFormControl"
            [errorStateMatcher]="matcher"
            type="password"
            autocomplete="on"
            minlength="2"
            maxlength="20" />
          @if (confirmPasswordFormControl.hasError('required')) {
            <mat-error>
              Confirm Password is
              <strong>required</strong>
            </mat-error>
          }
          @if (confirmPasswordFormControl.hasError('minlength')) {
            <mat-error>
              Confirm Password needs to have at least
              <strong>2 characters</strong>
            </mat-error>
          }
          @if (confirmPasswordFormControl.hasError('maxlength')) {
            <mat-error>
              Confirm Password needs to have max
              <strong>20 characters</strong>
            </mat-error>
          }
        </mat-form-field>
        @if (passwordFormGroup.hasError('notSame')) {
          <mat-error>
            Both passwords needs to be
            <strong>the same</strong>
          </mat-error>
        }
      </div>
      <div class="amsf-form__actions">
        <button mat-raised-button (click)="previous()" type="button">Previous</button>
        <button mat-raised-button type="submit" color="primary">Submit</button>
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
export class AccountComponent implements OnInit {
  public form!: FormGroup;
  public matcher = new ControlErrorStateMatcher();

  public get emailFormControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get passwordFormControl(): FormControl {
    return this.passwordFormGroup.get('password') as FormControl;
  }

  public get confirmPasswordFormControl(): FormControl {
    return this.passwordFormGroup.get('confirmPassword') as FormControl;
  }

  public get passwordFormGroup(): FormGroup {
    return this.form.get('password') as FormGroup;
  }

  constructor(
    private formProvider: FormProvider,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.form = this.formProvider?.getForm().get('account') as FormGroup;
  }

  public onSubmit(): void {
    console.log('Submit:');
    console.log(JSON.stringify(this.formProvider.getForm().value));
  }

  public previous(): void {
    this.location.back();
  }
}

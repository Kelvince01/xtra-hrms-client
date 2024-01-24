import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CommonModule, Location} from '@angular/common';
import {FormProvider} from "../../../../../core/base/form-provider";
import { ControlErrorStateMatcher } from '../../../../../core/error-matchers/control-error-state-matcher';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'xtra-user-account',
  template: `
    <form [formGroup]="form" class="amsf-form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput [formControl]="emailFormControl" [errorStateMatcher]="matcher" placeholder="Ex. pat@example.com"
               autocomplete="on">
        <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
          Please enter a valid email address
        </mat-error>
        <mat-error *ngIf="emailFormControl.hasError('required')">
          Email is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <div formGroupName="password" class="amsf-form__group">
        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput [formControl]="passwordFormControl" [errorStateMatcher]="matcher" type="password"
                 autocomplete="on" minlength="2" maxlength="20">
          <mat-error *ngIf="passwordFormControl.hasError('required')">
            Password is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="passwordFormControl.hasError('minlength')">
            Password needs to have at least <strong>2 characters</strong>
          </mat-error>
          <mat-error *ngIf="passwordFormControl.hasError('maxlength')">
            Password needs to have max <strong>20 characters</strong>
          </mat-error>
          <mat-error *ngIf="passwordFormControl.hasError('strong')">
            Password needs to contain at least one <strong>number, lower letter and upper letter</strong>
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Confirm Password</mat-label>
          <input matInput [formControl]="confirmPasswordFormControl" [errorStateMatcher]="matcher" type="password"
                 autocomplete="on" minlength="2" maxlength="20">
          <mat-error *ngIf="confirmPasswordFormControl.hasError('required')">
            Confirm Password is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="confirmPasswordFormControl.hasError('minlength')">
            Confirm Password needs to have at least <strong>2 characters</strong>
          </mat-error>
          <mat-error *ngIf="confirmPasswordFormControl.hasError('maxlength')">
            Confirm Password needs to have max <strong>20 characters</strong>
          </mat-error>
        </mat-form-field>
        <mat-error *ngIf="passwordFormGroup.hasError('notSame')">
          Both passwords needs to be <strong>the same</strong>
        </mat-error>
      </div>
      <div class="amsf-form__actions">
        <button mat-raised-button (click)="previous()" type="button">Previous</button>
        <button mat-raised-button type="submit" color="primary">Submit</button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  styles: [`
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
  `]
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

  constructor(private formProvider: FormProvider,
              private location: Location) {}

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

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ControlErrorStateMatcher } from '../../../../../core/error-matchers/control-error-state-matcher';
import { FormProvider } from '../../../../../core/base/form-provider';
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'xtra-user-contact-details',
  template: `
    <form [formGroup]="form" class="amsf-form">
      <mat-form-field appearance="fill">
        <mat-label>First Name</mat-label>
        <input matInput [formControl]="firstNameFormControl" [errorStateMatcher]="matcher" autocomplete="on"
               minlength="2" maxlength="20">
        <mat-error *ngIf="firstNameFormControl.hasError('required')">
          First Name is <strong>required</strong>
        </mat-error>
        <mat-error *ngIf="firstNameFormControl.hasError('minlength')">
          First Name needs to have at least <strong>2 characters</strong>
        </mat-error>
        <mat-error *ngIf="firstNameFormControl.hasError('maxlength')">
          First Name needs to have max <strong>20 characters</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Last Name</mat-label>
        <input matInput [formControl]="lastNameFormControl" [errorStateMatcher]="matcher" autocomplete="on"
               minlength="2" maxlength="30">
        <mat-error *ngIf="lastNameFormControl.hasError('required')">
          Last Name is <strong>required</strong>
        </mat-error>
        <mat-error *ngIf="lastNameFormControl.hasError('minlength')">
          Last Name needs to have at least <strong>2 characters</strong>
        </mat-error>
        <mat-error *ngIf="lastNameFormControl.hasError('maxlength')">
          Last Name needs to have max <strong>30 characters</strong>
        </mat-error>
      </mat-form-field>
      <div class="amsf-form__actions amsf-form__actions--flex-end">
        <button mat-raised-button type="button" color="primary" (click)="next()" [disabled]="form.invalid">Next</button>
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
export class ContactDetailsComponent implements OnInit {
  public form!: FormGroup;
  public matcher = new ControlErrorStateMatcher();

  public get firstNameFormControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  public get lastNameFormControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  constructor(private formProvider: FormProvider,
              private router: Router) { }

  public ngOnInit(): void {
    this.form = this.formProvider?.getForm().get('contact') as FormGroup;
  }

  public next(): void {
    if (this.form.valid) {
      this.router.navigateByUrl('/uam/users/add/account');
    }
  }
}

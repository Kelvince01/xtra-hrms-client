import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {EmailValidatorDirective} from '@shared/components/forms/validators/email-validator.directive';

interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-leave-upsert',
  standalone: true,
  imports: [CommonModule, FormsModule, EmailValidatorDirective],
  template: `
    <div class="container-fluid py-3">
      <h1>Angular Template-Driven Form Validation</h1>

      <div class="row justify-content-center my-5">
        <div class="col-4">
          <form #form="ngForm">
            <div class="row">
              <div class="col mb-2">
                <label for="name" class="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  #name="ngModel"
                  [(ngModel)]="user.name"
                  placeholder="Your name"
                  required
                  minlength="1"
                  maxlength="250"
                  class="form-control form-control-sm"
                  [class.is-invalid]="name.invalid && (name.dirty || name.touched)"
                />
                @if (name.invalid && (name.dirty || name.touched)) {
                  <div class="invalid-feedback">
                    @if (name.errors?.['required']) {
                      <div>This field is required.</div>
                    }
                    @if (name.errors?.['minlength']) {
                      <div>This field must have at least 1 character.</div>
                    }
                    @if (name.errors?.['maxlength']) {
                      <div>This field must have at most 250 characters.</div>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row">
              <div class="col mb-2">
                <label for="nickname" class="form-label">Nickname:</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  #nickname="ngModel"
                  [(ngModel)]="user.nickname"
                  placeholder="Your nickname"
                  maxlength="10"
                  class="form-control form-control-sm"
                  [class.is-invalid]="nickname.invalid && (nickname.dirty || nickname.touched)"
                />
                @if (nickname.invalid && (nickname.dirty || nickname.touched)) {
                  <div class="invalid-feedback">
                    @if (nickname.errors?.['maxlength']) {
                      <div>This field must have at most 10 characters.</div>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row">
              <div class="col mb-2">
                <label for="email" class="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  #email="ngModel"
                  [(ngModel)]="user.email"
                  placeholder="your-name@provider.com"
                  required
                  minlength="1"
                  maxlength="250"
                  xtraEmailValidator
                  class="form-control form-control-sm"
                  [class.is-invalid]="email.invalid && (email.dirty || email.touched)"
                />
                @if (email.invalid && (email.dirty || email.touched)) {
                  <div class="invalid-feedback">
                    @if (email.errors?.['required']) {
                      <div>This field is required.</div>
                    }
                    @if (email.errors?.['minlength']) {
                      <div>This field must have at least 1 character.</div>
                    }
                    @if (email.errors?.['maxlength']) {
                      <div>This field must have at most 250 characters.</div>
                    }
                    @if (
                      !email.errors?.['required'] &&
                      !email.errors?.['minlength'] &&
                      !email.errors?.['maxlength'] &&
                      email.errors?.['emailValidator']
                    ) {
                      <div>Invalid email format.</div>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="row">
              <div class="col mb-2">
                <label for="password" class="form-label">Password:</label>
                <div class="input-group input-group-sm has-validation">
                  <input
                    [type]="user.showPassword ? 'text' : 'password'"
                    id="password"
                    name="password"
                    #password="ngModel"
                    [(ngModel)]="user.password"
                    required
                    minlength="15"
                    class="form-control form-control-sm"
                    [class.is-invalid]="password.invalid && (password.dirty || password.touched)"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    (click)="user.showPassword = !user.showPassword"
                  >
                    <i
                      class="bi"
                      [ngClass]="{
                        'bi-eye-fill': !user.showPassword,
                        'bi-eye-slash-fill': user.showPassword
                      }"
                    ></i>
                  </button>
                  @if (password.invalid && (password.dirty || password.touched)) {
                    <div class="invalid-feedback">
                      @if (password.errors?.['required']) {
                        <div>This field is required.</div>
                      }
                      @if (password.errors?.['minlength']) {
                        <div>This field must have at least 15 characters.</div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-2 d-grid">
                <button type="button" class="btn btn-sm btn-primary" (click)="validate(form)">
                  Validate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class LeaveUpsertComponent {
  user: IUser;

  constructor() {
    this.user = {} as IUser;
  }

  public validate(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.info('Name:', this.user.name);
    console.info('Nickname:', this.user.nickname);
    console.info('Email:', this.user.email);
    console.info('Password:', this.user.password);
  }
}

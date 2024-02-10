import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, NgForm, Validators} from '@angular/forms';
import {EmailValidatorDirective} from '@shared/components/forms/validators/email-validator.directive';
import {Store} from '@ngrx/store';
import {CameraService} from '@data/services/common/camera.service';
import {PlatformInformationService} from '@data/services/common/platform-information.service';
import {getLoading} from '@stores/lms/leave.selector';
import {LeavesActions} from '@stores/lms/leave.action';

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
    <div class="container py-3">
      <h1>Add Leave</h1>

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

            <input
              hidden
              #fileInput
              type="file"
              id="file"
              accept="image/*"
              (change)="setFormData(fileInput.files)"
            />

            <div>
              <img [src]="base64" />
            </div>

            <label>{{ filename }}</label>

            <div class="d-flex justify-content-between mt-3">
              <div class="mb-10">
                <button type="button" class="btn btn-primary me-2" (click)="takePhoto()">
                  <i class="fa-solid fa-camera"></i>
                  Take picture
                </button>
                <button class="btn btn-primary" type="button" (click)="fileInput.click()">
                  <i class="fa-regular fa-file"></i>
                  Choose File
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col mb-2 d-grid">
                <button type="button" class="btn btn-sm btn-primary" (click)="validate(form)">
                  Validate
                </button>

                <button
                  type="submit"
                  class="btn btn-primary mt-6"
                  [disabled]="!formGroup.valid || loading()"
                >
                  @if (loading()) {
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  }
                  <i class="fa-solid fa-plus"></i>
                  Add Leave
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

  private readonly fb = inject(FormBuilder);

  private readonly store = inject(Store);

  private readonly cameraService = inject(CameraService);

  private readonly platformInformationService = inject(PlatformInformationService);

  formGroup = this.fb.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    comment: ['', Validators.required],
  });

  loading = this.store.selectSignal(getLoading);

  filename = '';

  base64 = '';

  get isMobile(): boolean {
    return this.platformInformationService.isMobile;
  }

  private formData!: FormData;

  setFormData(files: any): void {
    if (files[0]) {
      const formData = new FormData();
      console.log(files[0]);
      formData.append(files[0].name, files[0]);
      this.filename = files[0].name;
      this.formData = formData;
    }
  }

  takePhoto(): void {
    this.cameraService.getPhoto().subscribe(({formData, fileName, base64}) => {
      this.formData = formData;
      this.filename = fileName;
      this.base64 = base64;
    });
  }

  addDoggo(): void {
    if (this.formGroup.valid) {
      // const { name, comment, breed } = this.formGroup.value;

      this.store.dispatch(
        LeavesActions.addLeaveWithPicture({
          // name,
          // comment,
          // breed,
          // formData: this.formData,
          leave: this.formGroup.value as any,
        }),
      );
    }
  }
}

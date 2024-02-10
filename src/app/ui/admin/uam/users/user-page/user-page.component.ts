import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormProvider} from '@core/base/form-provider';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator} from '@shared/components/forms/validators/password.validator';
import {IUser} from '@data/models';
import {HttpErrorResponse} from '@angular/common/http';
import {UsersService} from '@data/services';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'xtra-user-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="user-register">
      <h2>Register User</h2>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .user-register {
        padding: 1rem;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  providers: [{provide: FormProvider, useExisting: UserPageComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent extends FormProvider implements OnInit {
  public registrationForm!: FormGroup;
  service = inject(UsersService);
  readonly #toastr = inject(ToastrService);

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public getForm(): FormGroup {
    return this.registrationForm;
  }

  private initForm(): void {
    this.registrationForm = this.formBuilder.group({
      'contact': this.formBuilder.group({
        'firstName': this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        'lastName': this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      }),
      'account': this.formBuilder.group({
        'email': this.formBuilder.control('', [Validators.required, Validators.email]),
        'password': this.formBuilder.group(
          {
            'password': this.formBuilder.control('', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20),
              PasswordValidator.strengthPassword,
            ]),
            'confirmPassword': this.formBuilder.control('', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20),
            ]),
          },
          {validators: [PasswordValidator.checkPasswords]},
        ),
      }),
    });
  }

  edit(dto: IUser, id?: number) {
    this.service.update(dto).subscribe({
      next: (response) => {
        // void this.#router.navigate(['/object', response.id]);
        this.#toastr.success(`${name} update successfully`, 'Success');
      },
      error: (error: HttpErrorResponse) => {
        console.error(`error updating ${name}: `, error);
        this.#toastr.error(`Error when updating ${name} ${error}`, 'Failed');
      },
    });
  }
}

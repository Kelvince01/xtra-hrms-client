import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {Field} from '@stores/forms';
import {Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthStore} from '@stores/auth';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';
import {RouterLink} from '@angular/router';
import {ListErrorsComponent} from '@shared/components/forms/list-errors';
import {DynamicFormComponent} from '@shared/components/forms/dynamic-form';
import {StrongPasswordRegx} from '@shared/utils';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Username',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required, Validators.pattern(StrongPasswordRegx)],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'xtra-sign-up',
  standalone: true,
  imports: [RouterLink, ListErrorsComponent, DynamicFormComponent],
  template: `
    <section class="flex flex-col lg:flex-row p-2 w-full">
      <div
        class="w-full mt-4 md:mt-0 lg:w-1/2 flex flex-col items-center justify-center content-center"
      >
        <span class="text-2xl font-black">SIGN UP</span>

        <p class="text-xs-center">
          <a [routerLink]="['/accounts/sign-in']">Have an account?</a>
        </p>

        <xtra-list-errors></xtra-list-errors>

        <xtra-dynamic-form
          class="flex flex-col md:w-2/4"
          (updateForm)="updateForm($event)"
          [data$]="data$"
          [structure$]="structure$"
        ></xtra-dynamic-form>
        <button
          data-e2e-id="sign-up"
          (click)="submit()"
          class="btn btn-lg btn-primary pull-xs-right"
          type="submit"
        >
          Sign up
        </button>
      </div>

      <div class="hidden lg:flex w-full lg:w-1/2 flex items-center content-center justify-center">
        <img src="assets/svgs/signup.svg" alt="Signup illustration" class="w-11/12" />
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({structure}));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({data: changes}));
  }

  submit() {
    this.authStore.register();
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeForm());
  }
}

/*
const { value: phone_number } = await Swal.fire({
      title: 'Kindly provide your phone number',
      input: 'number',
      inputLabel: 'Your phone number',
      inputPlaceholder: '0700000000',
      customClass: {
        confirmButton: 'sweetAlertButton'
      }
    });
 */

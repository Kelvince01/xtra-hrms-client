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
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <a [routerLink]="['/accounts/sign-in']">Have an account?</a>
            </p>

            <xtra-list-errors></xtra-list-errors>

            <xtra-dynamic-form
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
        </div>
      </div>
    </div>
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

import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Field} from '@stores/forms';
import {Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthStore} from '@stores/auth';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';
import {RouterLink} from '@angular/router';
import {ListErrorsComponent} from '@shared/components/forms/list-errors';
import {DynamicFormComponent} from '@shared/components/forms/dynamic-form';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'xtra-sign-in',
  standalone: true,
  imports: [RouterLink, ListErrorsComponent, DynamicFormComponent, MatButton, MatCard],
  template: `
    <div class="auth-page">
      <div class="container mx-auto px-4">
        <div class="columns-1">
          <div class="offset-md-3 col-xs-12 mt-3 mx-4 flex justify-center">
            <mat-card class="p-4">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a [routerLink]="['/accounts/sign-up']">Need an account?</a>
              </p>

              <xtra-list-errors></xtra-list-errors>

              <xtra-dynamic-form
                (updateForm)="updateForm($event)"
                [data$]="data$"
                [structure$]="structure$"
              ></xtra-dynamic-form>
              <button data-e2e-id="sign-in" (click)="submit()" mat-flat-button type="submit">
                Sign in
              </button>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-card {
        width: 600px;
      }

      mat-form-field {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {
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
    this.authStore.login();
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeForm());
  }
}

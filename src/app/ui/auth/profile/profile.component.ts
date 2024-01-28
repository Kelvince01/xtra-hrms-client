import {ChangeDetectionStrategy, Component, OnInit, effect, inject, untracked} from '@angular/core';
import {Field} from '@stores/forms';
import {Validators} from '@angular/forms';
import {ListErrorsComponent} from '../../../shared/components/forms/list-errors/list-errors.component';
import {DynamicFormComponent} from '../../../shared/components/forms/dynamic-form/dynamic-form.component';
import {Store} from '@ngrx/store';
import {AuthStore} from '@stores/auth';
import {SettingsStoreService} from './profile.store';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'image',
    placeholder: 'URL of profile picture',
    validator: [],
  },
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Your Name',
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    name: 'bio',
    placeholder: 'Short bio about you',
    validator: [],
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
    placeholder: 'New Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'xtra-profile',
  standalone: true,
  imports: [ListErrorsComponent, DynamicFormComponent],
  template: `
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <xtra-list-errors></xtra-list-errors>

            <xtra-dynamic-form
              (updateForm)="updateForm($event)"
              [data$]="data$"
              [structure$]="structure$"
            ></xtra-dynamic-form>
            <div class="edit-button-container">
              <button (click)="submit()" class="btn btn-lg btn-primary pull-xs-right" type="submit">
                Update Settings
              </button>
            </div>

            <hr />

            <button class="btn btn-outline-danger" (click)="logout()">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .edit-button-container {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly settingsStoreService = inject(SettingsStoreService);

  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  readonly fillInForm = effect(() => {
    const isLoggedIn = this.authStore.isAuthenticated();
    if (isLoggedIn) {
      untracked(() => this.store.dispatch(formsActions.setData({data: this.authStore.user()})));
    }
  });

  ngOnInit() {
    this.authStore.getUser();
    this.store.dispatch(formsActions.setStructure({structure}));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({data: changes}));
  }

  submit() {
    this.settingsStoreService.updateSettings();
  }

  logout() {
    this.authStore.logout();
  }
}

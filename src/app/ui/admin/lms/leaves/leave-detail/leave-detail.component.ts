import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import suite from './suite';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-leave-detail',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      @for (input of formInputs | keyvalue: noSort; track input) {
        <div>
          <div class="form-input">
            <!--            [ngClass]="{error: formValidations?.errorMessages?.[input.key]?.length > 0}"-->
            <label for="{{ input.key }}">
              <!--              <strong>{{ input.value.label }}:</strong>-->
              <!--span class="validation-message">
                {{ formValidations.errorMessages?.[input.key]?.[0] }}
              </span-->
            </label>
            <input
              id="{{ input.key }}"
              type="text"
              formControlName="{{ input.key }}"
              (change)="handleChange($event.target)" />
          </div>
        </div>
      }

      <div class="form-checkbox">
        <!--        [ngClass]="{error: formValidations?.errorMessages?.['tos']?.length > 0}"-->
        <input
          id="tos"
          type="checkbox"
          formControlName="tos"
          (change)="handleChange($event.target)" />
        <span>I have read and agreed to the terms of service</span>
      </div>

      <button type="submit" class="btn-submit">Submit</button>
      <!--      [disabled]="!formValidations.isValid"-->
    </form>
  `,
  styles: [
    `
      form {
        --color-error: rgb(245, 137, 137);
        --color-warning: rgb(245, 202, 137);
        --color-success: rgb(121, 196, 114);
        --color-content-active: #5081a6;
        --color-content-semi: #89b8dd;
        --color-content-inactive: #cfe3f0;
        color: #999;
      }

      form {
        width: 500px;
        padding: 1.5em;
        margin: 0 auto;
        border-radius: 10px;
        background: white;
        box-shadow: 0 10px 25px rgba(27, 37, 46, 0.5);
      }

      button.btn-submit {
        border: 0;
        background: rgb(47, 73, 118);
        background: linear-gradient(180deg, rgba(47, 73, 118, 1) -50%, rgba(26, 30, 65, 1) 150%);
        padding: 1em;
        margin-top: 1em;
        width: 100%;
        color: white;
        font-size: 1em;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        font-weight: 500;
      }

      button.btn-submit:not(:disabled):hover {
        box-shadow: 0 0 10px rgba(47, 73, 118, 0.8);
        background: linear-gradient(180deg, rgba(47, 73, 118, 1) 0%, rgba(26, 30, 65, 1) 200%);
      }

      button.btn-submit:active {
        background: linear-gradient(0deg, rgba(47, 73, 118, 1) 0%, rgba(26, 30, 65, 1) 200%);
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
      }

      button.btn-submit:disabled {
        background: rgb(209, 209, 209);
        cursor: default;
      }
    `,
  ],
})
export class LeaveDetailComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: any = this.fb.group({
    username: [''],
    password: [''],
    confirm: [''],
    tos: [false],
  });

  formInputs: any = {
    username: { label: 'UserName' },
    password: { label: 'Password' },
    confirm: { label: 'Confirm' },
  };

  formValidations: any = {
    isValid: false,
    errorMessages: {},
  };

  ngOnInit(): void {}

  handleChange(event: any): void {
    const controlName = event.id;
    const formValues = this.form.value;

    // const result = suite(formValues, controlName);

    // this.formValidations.isValid = result.isValid();
    // this.formValidations.errorMessages[controlName] = result.getErrors(controlName);
  }

  onSubmit(): void {
    if (this.formValidations.isValid) {
      alert('Submit!');
    }
  }

  noSort(): number {
    return 0;
  }
}

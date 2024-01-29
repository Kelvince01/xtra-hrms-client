import {ChangeDetectionStrategy, Component, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {OtpInputComponent} from '@auth-ui/verify-otp/otp-input.component';

@Component({
  selector: 'xtra-verify-otp',
  standalone: true,
  imports: [ReactiveFormsModule, OtpInputComponent, FormsModule],
  template: `
    <!--div class="container">
      <form (ngSubmit)="onSubmit()" [formGroup]="form" class="form-group">
        <h3>Enter your OTP</h3>
        <div class="row">
          @for (input of formInput; track input; let i = $index) {
            <div class="flex col-sm-2 m-2">
              <input
                #formRow
                type="text"
                formControlName="{{ input }}"
                class="flex-row"
                maxlength="1"
                (keyup)="keyUpEvent($event, i)"
              />
            </div>
          }
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div-->

    <xtra-otp-input #input="ngModel" [(ngModel)]="data" />
    <b>Entered value:</b>
    {{ data }}
    <br />
    <b>Input valid:</b>
    {{ input.valid }}
  `,
  styles: [
    `
      .form-group {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyOtpComponent {
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  data = '';

  constructor() {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements: any): FormGroup<any> {
    const group: any = {};

    elements.forEach((key: any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event: any, index: number): void {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}

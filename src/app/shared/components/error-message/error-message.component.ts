import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {getValidatorErrorMessage} from '@shared/components/forms/validators/validators.util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[xtra-error-message]',
  standalone: true,
  imports: [],
  template: `
    @if (errorMessage !== null) {
      {{ errorMessage }}
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input()
  control!: AbstractControl;

  constructor() {}

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched)
        return getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
    }
    return null;
  }
}

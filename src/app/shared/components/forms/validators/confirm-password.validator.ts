import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
USAGE:
passwordForm: FormGroup = new FormGroup({
      password1: new FormControl<string>('', [Validators.required]),
      password2: new FormControl<string>('', [Validators.required]),
      { validators: [confirmPasswordValidator]}
  });
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.password1 === control.value.password2 ? null : { PasswordNoMatch: true };
};

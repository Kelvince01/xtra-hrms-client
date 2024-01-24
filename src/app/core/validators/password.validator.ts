import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator {
  public static checkPasswords: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value
    return pass === confirmPass || !pass || !confirmPass ? null : { notSame: true }
  }

  public static strengthPassword = (control: AbstractControl): ValidationErrors | null => {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
}

import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

export const upperLowerSymbolNumberRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

export const mismatchErrorKey = 'mismatch';

export function createEqualsValidator(
  control: FormControl,
  matchControl: FormControl,
): ValidatorFn {
  return () => (control?.value === matchControl?.value ? null : {[mismatchErrorKey]: true});
}

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

import {FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

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

type FormSimpleType = string | number;

// Wrap every "Type" property with FormControl or FormArray to implement typed form interface with no data model duplication
// Take into account that string[] or number[] could be valid form fields
export type FormBy<Type = {}> = FormGroup<{
  [Property in keyof Type]: Type[Property] extends any[]
    ? Type[Property] extends FormSimpleType[]
      ? FormControl<Type[Property]>
      : FormArray<FormControl<Type[Property][number]>>
    : FormControl<Type[Property]>;
}>;

/*
const form: FormBy<Car> = this.fb.group({
    model: new FormControl<string>('Y', {nonNullable: true, validators: Validators.required}),
    engines: new FormArray<FormControl<Engine>>([]),
    bodies: new FormControl<string[]>([])
  });
 */

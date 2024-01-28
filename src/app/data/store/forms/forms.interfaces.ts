import {ValidatorFn} from '@angular/forms';

export interface Field {
  type: FieldType;
  name: string;
  value?: string | number | boolean;
  label?: string;
  placeholder?: string;
  validator?: ValidatorFn[];
  attrs?: FieldAttrs;
}

export type FieldType = 'INPUT' | 'TEXTAREA';

export interface FieldAttrs {
  type?: string;
  rows?: number;
}

export interface Errors {
  [key: string]: string;
}

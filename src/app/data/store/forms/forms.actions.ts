import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Errors } from './forms.interfaces';

export const formsActions = createActionGroup({
  source: 'Forms',
  events: {
    setData: props<{ data: any }>(),
    updateData: props<{ data: any }>(),
    setStructure: props<{ structure: any }>(),
    setErrors: props<{ errors: Errors }>(),
    initializeErrors: emptyProps(),
    initializeForm: emptyProps(),
    resetForm: emptyProps(),
  },
});

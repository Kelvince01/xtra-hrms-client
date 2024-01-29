import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {UsersService} from '@data/services';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class PhoneValidator {
  static createValidator(userService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService
        .checkIfUsernameExists(control.value)
        .pipe(map((result: boolean) => (result ? {usernameAlreadyExists: true} : null)!));
    };
  }

  validatePhone(): {[key: string]: any} | null {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      // eslint-disable-next-line eqeqeq
      if (control.value && control.value.length != 10) {
        return {phoneNumberInvalid: true};
      }
      return null;
    };
  }
}

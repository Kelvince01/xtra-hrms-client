import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {UsersService} from '@data/services';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class UsernameValidator {
  static createValidator(userService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService
        .checkIfUsernameExists(control.value)
        .pipe(map((result: boolean) => (result ? {usernameAlreadyExists: true} : null)!));
    };
  }
}

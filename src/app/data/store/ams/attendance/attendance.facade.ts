/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {addAttendance} from './attendance.action';
import {selectIsLoading} from './attendance.selector';

@Injectable()
export class AttendanceFacade {
  email = '';
  password = '';
  token = '';
  error = '';
  isLoading = false;

  constructor(private store: Store) {
    // this.store.select(selectToken).pipe(token => (this.token = token));
    // this.store.select(selectAttendanceError).subscribe((error) => (this.error = error));
    this.store.select(selectIsLoading).subscribe((isLoading) => (this.isLoading = isLoading));
  }

  add() {
    this.store.dispatch(addAttendance({email: this.email, password: this.password}));
  }
}

/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {UsersService} from '@data/services';
import {TestBed} from '@angular/core/testing';
import {provideMock, jest} from '../../utils/auto-mock.util';

describe('UsersService with service mock', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMock(UsersService)],
    });

    service = TestBed.inject(UsersService);
  });

  it('should dosomething correct', () => {
    const spy = jest.spyOn(service, 'myMethod');

    // act
    // ...

    // assert
    // ...
  });
});

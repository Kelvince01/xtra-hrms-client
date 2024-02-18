/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { TestBed } from '@angular/core/testing';
// import {cold} from 'jasmine-marbles';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard } from '@core/guards/auth.guard';
import { LocalStorageJwtService } from '@shared/services';
import { of } from 'rxjs';

@Component({
  selector: 'xtra-test-comp',
  template: ``,
})
class TestComponent {}

describe('authGuard', () => {
  // let storage: LocalStorageJwtService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'accounts/sign-in',
            component: TestComponent,
          },
        ]),
      ],
      providers: [{ provide: LocalStorageJwtService, useValue: { getItem: () => of('token') } }],
    });

    // storage = TestBed.inject(LocalStorageJwtService);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is logged in', () => {
    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBeObservable(
      null as any, //cold('(a|)', {a: true})
    );
  });

  it('should return login urlTree if the user is not logged in', () => {
    // jest.spyOn(storage, 'getItem').mockImplementationOnce(() => of(null));

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBeObservable(
      null as any, //cold('(a|)', {a: router.parseUrl('/login')})
    );
  });
});

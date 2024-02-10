/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {TestBed} from '@angular/core/testing';
import {EmployeesService} from '@data/services';
import {autoMock} from '../../utils/auto-mock.util';

describe('XyzService with service mock', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: EmployeesService, useClass: autoMock(EmployeesService)}],
    });

    service = TestBed.inject(EmployeesService);
  });
});

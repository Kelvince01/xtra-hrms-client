/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Provider} from '@angular/core';

export const jest: any = null;

export function autoMock<T>(obj: new (...args: any[]) => T): T {
  const res = {} as any;

  const keys = Object.getOwnPropertyNames(obj.prototype);

  const allMethods = keys.filter((key) => {
    try {
      return typeof obj.prototype[key] === 'function';
    } catch (error) {
      return false;
    }
  });

  const allProperties = keys.filter((x) => !allMethods.includes(x));

  // Mocking with jest here, modify to your needs if needed
  allMethods.forEach((method) => (res[method] = jest.fn()));

  allProperties.forEach((property) => {
    Object.defineProperty(res, property, {
      get: function () {
        return '';
      },
      configurable: true,
    });
  });

  return res;
}

export function provideMock<T>(type: new (...args: any[]) => T): Provider {
  const mock = autoMock(type);

  return {provide: type, useValue: mock};
}

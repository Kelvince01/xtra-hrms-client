/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {isPlatformServer} from '@angular/common';
import {Injectable, PLATFORM_ID, inject} from '@angular/core';

/**
 * Service to access the window object
 * @description Avoids errors when running the app on the server
 */
@Injectable({providedIn: 'root'})
export class WindowService {
  #isServer = isPlatformServer(inject(PLATFORM_ID));

  get isServer(): boolean {
    return this.#isServer;
  }

  get isBrowser(): boolean {
    return !this.#isServer;
  }

  constructor() {
    if (this.#isServer) this.#overrideConsoleLog();
  }

  setLocalStorage(key: string, value: string): void {
    if (this.#isServer) return;
    window.localStorage.setItem(key, value);
  }

  setLocalStorageObject(key: string, value: object): void {
    if (this.#isServer) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorageObject(key: string): any {
    if (this.#isServer) return null;
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  getLocalStorage(key: string): any {
    if (this.#isServer) return null;
    const value = window.localStorage.getItem(key);
    return value ? value : null;
  }

  removeLocalStorage(key: string): void {
    if (this.#isServer) return;
    window.localStorage.removeItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }

  #overrideConsoleLog(): void {
    // eslint-disable-next-line no-console,@typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
    console.log = (message?: any, ...optionalParams: any[]) => {
      return;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
    console.error = (message?: any, ...optionalParams: any[]) => {
      return;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
    console.warn = (message?: any, ...optionalParams: any[]) => {
      return;
    };
  }
}

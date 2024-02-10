/*
 * Copyright (c) 2023-2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {HttpClient} from '@angular/common/http';
import {InjectionToken} from '@angular/core';
import {LogLevel} from '@data/types/logger.type';
import {Observable} from 'rxjs';

export function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get('https://someUrl.com/api/settings').pipe();
}

/**
 * Application configuration type
 */
export type AppConfig = {
  /** Minimum log level to write */
  logLevel: LogLevel;
};

const DEFAULT_CONFIG = {
  logLevel: LogLevel.info,
};

/** Application configuration token*/
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

/**
 * Provides the application configuration
 * @description This is a factory function with predefined values
 * @param appConfig The application configuration (optional with default values)
 */
export const provideAppConfig = (appConfig?: Partial<AppConfig>) => {
  const value = {...DEFAULT_CONFIG, ...appConfig};
  return {
    provide: APP_CONFIG,
    useValue: value,
  };
};

/*
{
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient],
      multi: true,
    },
 */

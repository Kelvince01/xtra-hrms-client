/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

/* eslint-disable */
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '/api';
}

/**
 * Application configuration interface
 * Parameters for `.forRoot()`
 */
export interface ApiConfigurationParams {
  /** Base URL of the API */
  rootUrl?: string;
}

/**
 * Provides the application configuration
 * @description This is a factory function with predefined values
 * @param appConfig The application configuration (optional with default values)
 */
export const provideApiConfig = (appConfig?: Partial<ApiConfigurationParams>) => {
  return {
    provide: ApiConfiguration,
    useValue: {rootUrl: environment.BASE_API_URL},
  };
};

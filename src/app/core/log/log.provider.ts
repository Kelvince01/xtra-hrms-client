/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Provider, makeEnvironmentProviders} from '@angular/core';
import {DEFAULT_CONFIG, LOGGER_CONFIG, LoggerConfig} from './logger.config';
import {LoggerService} from './logger.service';

/**
 * Provides the application logger
 * @description This is a factory function with predefined values
 * @param loggerConfig The application configuration (optional with default values)
 * @param writer
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const provideLogger = (loggerConfig?: Partial<LoggerConfig>, writer?: Provider) => {
  const value = {...DEFAULT_CONFIG, ...loggerConfig};
  const providers: Provider[] = [LoggerService, {provide: LOGGER_CONFIG, useValue: value}];
  if (writer) {
    providers.push(writer);
  }
  return makeEnvironmentProviders(providers);
};

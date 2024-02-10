/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {APP_INITIALIZER, ErrorHandler, Injectable, inject} from '@angular/core';
import * as Sentry from '@sentry/angular-ivy';
import {Router} from '@angular/router';
import {LoggerService} from '@core/log/logger.service';
import {NotificationsStore} from '@shared/services/notifications.store';
import {LogLevel} from '@data/types/logger.type';

/**
 * Service to handle errors
 * @description Logs the error and notifies the user
 */
@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  #log = inject(LoggerService);
  #notifications = inject(NotificationsStore);

  handleError(err: any): void {
    this.#log.log({
      type: LogLevel.error,
      message: err.message,
      name: err.message,
      source: '🪖 Error Service Handler',
      description: err,
    });
    this.#notifications.showFailure({
      title: 'Application Failed',
      message: 'We will work on it. Please, reload and try again.',
    });
  }
}

/**
 * Provides an error handler with rollbar
 * @description this is a factory function
 * @see UploadInterceptor
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const provideErrorHandler = () => {
  return [
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ];
};

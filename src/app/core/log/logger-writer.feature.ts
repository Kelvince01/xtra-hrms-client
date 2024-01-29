/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Provider} from '@angular/core';
import {IAppLog} from '@models/app-log.model';

/**
 * Log writer interface
 */

export abstract class LogWriter {
  abstract write(entry: IAppLog): void;
}

/**
 * Default log writer
 */
const DEFAULT_WRITER: LogWriter = {
  write(entry: IAppLog): void {
    // eslint-disable-next-line no-console
    console.log(entry);
  },
};

/**
 * Logger feature provider
 * @param logWriter Log writer (optional with default value)
 * @returns a logger feature provider
 */
export function withWriter(logWriter: LogWriter = DEFAULT_WRITER): Provider {
  return [
    {
      provide: LogWriter,
      useValue: logWriter,
    },
  ];
}

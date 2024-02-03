/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {LogLevel} from '@data/types/logger.type';
import { IAppLog } from '@models/app-log.model';

export class LabLogWriter {
  write(entry: IAppLog): void {
    const entryMessage = `${entry.message} @ ${entry.source}`;
    switch (entry.type) {
      case LogLevel.debug:
        // eslint-disable-next-line no-console
        console.log(`🔍 ${entryMessage}`, entry.description);
        break;
      case LogLevel.info:
        // eslint-disable-next-line no-console
        console.log(`📘 ${entryMessage}`, entry.description);
        break;
      case LogLevel.warn:
        // eslint-disable-next-line no-console
        console.log(`☣️ ${entryMessage}`, entry.description);
        break;
      case LogLevel.error:
        // eslint-disable-next-line no-console
        console.log(`🔥 ${entryMessage}`, entry.description);
        break;
    }
  }
}

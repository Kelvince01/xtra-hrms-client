import {inject, Injectable} from '@angular/core';
import {IAppLog} from '@models/app-log.model';
import {LogLevel} from '@data/types/logger.type';
// import {AuthService} from '@services/auth.service';
import {AppLogsService} from '@services/app-logs.service';
import {LOGGER_CONFIG} from './logger.config';
import {LogWriter} from './logger-writer.feature';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  #minLevel: LogLevel = inject(LOGGER_CONFIG).minLevel;
  #writer = inject(LogWriter);

  service = inject(AppLogsService);
  // authService = inject(AuthService);

  /**
   * Write a log entry
   * @param entry A log entry
   */
  log(entry: IAppLog): void {
    if (entry.type < this.#minLevel) return;
    this.#writer.write(entry);

    /*if (!this.authService.isAuthenticated()) {
      return;
    }*/

    const data: IAppLog = {
      message: entry.message,
      source: entry.source,
      action: '',
      name: entry.message,
      description: entry.description,
      type: entry.type,
    };

    this.service.createLog(data);
  }
}

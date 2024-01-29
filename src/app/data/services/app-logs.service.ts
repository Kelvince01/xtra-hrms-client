import {inject, Injectable} from '@angular/core';
import {IAppLog} from '@models/app-log.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paginated} from '@data/models';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppLogsService {
  #http = inject(HttpClient);
  url = `${environment.BASE_API_URL}app-logs/`;

  createLog(log: IAppLog): Observable<IAppLog> {
    return this.#http.post<IAppLog>(`${`${this.url}`}`, log);
  }

  getLogs(): Observable<Paginated<IAppLog>> {
    return this.#http.get<Paginated<IAppLog>>(`${this.url}`);
  }
}

import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {ChatContent, IEmail, IEmailSetting, ISms} from '@models/communication.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';

@Injectable()
export class SmsService extends BaseService<ISms> {
  protected collectionName: string = 'sms';
}

@Injectable()
export class EmailSettingsService extends BaseService<IEmailSetting> {
  override collectionName = 'email-settings';
}

@Injectable()
export class EmailService extends BaseService<IEmail> {
  override collectionName = 'emails';

  #http = inject(HttpClient);

  fetchInbox(): Observable<IEmail[]> {
    const url = `${this.url}email/inbox`;
    // eslint-disable-next-line no-console
    console.log(`Fetch inbox URL is ${url}`);

    return this.#http.get<IEmail[]>(url);
  }

  getDisplayableFrom(from: string): string {
    let cleanText: string = from.replace(/<\/?[^>]+(>|$)/g, '');

    if (cleanText.length > 20) {
      cleanText = `${cleanText.substring(0, 21)}...`;
    }

    return cleanText;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  private dataCache: {[key: number]: any[]} = {};

  chat(chatContent: ChatContent): Observable<ChatContent> {
    return this.http.post<ChatContent>('http://localhost:3000/api/chatbot', chatContent);
  }

  getPaginatedData(page: number, itemsPerPage: number): Observable<any> {
    if (this.dataCache[page]) {
      return of(this.dataCache[page]); // Return the cached data
    }
    return this.http.get<any>(`api/data?page=${page}&itemsPerPage=${itemsPerPage}`).pipe(
      tap((data) => {
        this.dataCache[page] = data.results; // Cache the fetched data
      }),
    );
  }
}

@Injectable()
export class ChatWebsocketService {
  chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/');

  constructor() {
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const message = data['message'];
      console.log(message);
      // Handle incoming message
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };
  }

  // Send message to server
  sendMessage(message: string) {
    this.chatSocket.send(
      JSON.stringify({
        'message': message,
      }),
    );
  }
}

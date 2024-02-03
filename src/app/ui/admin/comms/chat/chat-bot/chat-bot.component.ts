import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {finalize} from 'rxjs/operators';
import {LineBreakPipe} from '@shared/pipes/line-break.pipe';
import {ChatContent} from '@models/communication.model';
import {ChatService} from '@services/comms.service';

@Component({
  selector: 'xtra-chat-bot',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    LineBreakPipe,
  ],
  template: `
    <div class="app-container">
      <div class="chat-container">
        @if (contents.length === 0) {
          <div class="message-container">
            <p class="message">
              Welcome to PaLM ChatBot
              <br />
              Write a text to start.
            </p>
          </div>
        }
        @for (content of contents; track content) {
          <div class="chat-message" [ngClass]="content.agent">
            <img [src]="'assets/avatar-' + content.agent + '.png'" class="avatar" />
            <div class="message-details">
              <p
                class="message-content"
                [ngClass]="{loading: content.loading}"
                [innerHTML]="content.message | lineBreak"
              ></p>
            </div>
          </div>
        }
      </div>

      <div class="chat-footer-container">
        <mat-form-field class="chat-input">
          <input
            placeholder="Send a message"
            matInput
            #inputMessage
            [(ngModel)]="message"
            (keyup.enter)="sendMessage(message)"
          />
        </mat-form-field>
        <button mat-icon-button color="primary" (click)="sendMessage(message)">
          <mat-icon>send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        position: fixed;
        width: 100%;
        height: 100%;
      }

      .chat-input {
        padding-top: 20px;
        width: calc(100% - 48px);
      }

      .user {
        background-color: #bbeeff;
      }

      .chatbot {
        background-color: #e8eaf6;
      }

      .chat-footer-container {
        position: fixed;
        bottom: 25px;
        left: 25px;
        right: 25px;
        display: flex;
        align-items: center;
      }

      .chat-container {
        overflow: auto;
        position: fixed;
        top: 25px;
        left: 25px;
        right: 25px;
        bottom: 120px;
      }

      .chat-message {
        display: flex;
        align-items: flex-start;
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .message-details {
        flex: 1;
        align-self: center;
      }

      .username {
        font-weight: bold;
        color: #333;
      }

      .message-content {
        margin: 5px 0;
        color: #666;
      }

      .message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .message {
        text-align: center;
        color: #333;
        padding: 20px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .loading {
        font-size: 30px;
        animation: fadeIn 1s ease-in-out infinite;
      }
    `,
  ],
})
export class ChatBotComponent {
  message = '';

  contents: ChatContent[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage(message: string): void {
    const chatContent: ChatContent = {
      agent: 'user',
      message,
    };

    this.contents.push(chatContent);
    this.contents.push({
      agent: 'chatbot',
      message: '...',
      loading: true,
    });

    this.message = '';
    this.chatService
      .chat(chatContent)
      .pipe(
        finalize(() => {
          const loadingMessageIndex = this.contents.findIndex((content) => content.loading);
          if (loadingMessageIndex !== -1) {
            this.contents.splice(loadingMessageIndex, 1);
          }
        }),
      )
      .subscribe((content) => {
        this.contents.push(content);
      });
  }
}

import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'xtra-email-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-card>
      <mat-expansion-panel (opened)="opened = true" (closed)="opened = false" hideToggle="true">
        <mat-expansion-panel-header>
          <div class="email-toolbar" fxLayoutAlign="start center" fxLayout="row">
            <div fxFlex="50px" [fxShow]="!opened">
              <span class="avatar accent-1">
                {{ avatar }}
              </span>
            </div>
            <div fxFlex="20%" [fxShow]="!opened">
              {{ from }}
            </div>
            <div fxFlex fxFill class="email-subject">
              {{ subject }}
            </div>
            <div fxFlex="15%" class="btn-col">
              <button
                [matMenuTriggerFor]="snoozeMenu"
                mat-icon-button
                matTooltip="Remind Me..."
                matTooltipPosition="above">
                <mat-icon>alarm</mat-icon>
              </button>
              <mat-menu
                class="snooze-menu"
                #snoozeMenu="matMenu"
                [overlapTrigger]="false"
                xPosition="before">
                <h3>Snooze until...</h3>
                <hr />
                <button mat-menu-item>
                  <mat-icon>brightness_6</mat-icon>
                  Later Today
                </button>
                <button mat-menu-item>
                  <mat-icon>brightness_5</mat-icon>
                  Tomorrow
                </button>
                <button mat-menu-item>
                  <mat-icon>today</mat-icon>
                  Later this week
                </button>
              </mat-menu>
              <button
                mat-icon-button
                (click)="removed.emit()"
                matTooltip="Delete"
                matTooltipPosition="above">
                <mat-icon>delete</mat-icon>
              </button>
              <button
                mat-icon-button
                (click)="removed.emit()"
                matTooltip="Done"
                matTooltipPosition="above">
                <mat-icon>done</mat-icon>
              </button>
            </div>
          </div>
        </mat-expansion-panel-header>
        <div class="email-body" fxLayout="row">
          <div fxFlex="50px" class="mt-2">
            <span class="avatar accent-1 large">
              {{ avatar }}
            </span>
          </div>
          <div fxFlex>
            <div class="email-body-toolbar">
              <span class="email-from">{{ from }}</span>
              <span class="email-to">to me</span>
              <button mat-icon-button class="email-more" [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu
                class="email-more-menu"
                #menu="matMenu"
                [overlapTrigger]="false"
                xPosition="before">
                <button mat-menu-item (click)="onReply()">
                  <mat-icon>reply</mat-icon>
                  Reply
                </button>
                <button mat-menu-item (click)="onReply()">
                  <mat-icon>forward</mat-icon>
                  Forward
                </button>
                <hr />
                <button mat-menu-item>
                  <mat-icon>print</mat-icon>
                  Print
                </button>
              </mat-menu>
            </div>
            <div [innerHTML]="body" class="email-body"></div>
          </div>
        </div>
      </mat-expansion-panel>
    </mat-card>
  `,
  styles: [
    `
      app-email {
        .mat-card {
          color: #212121;
          padding: 0;

          .btn-col {
            text-align: right;
          }
        }

        .email-toolbar {
          padding: 12px 24px;
          width: 100%;
          cursor: pointer;
        }

        .email-subject {
          line-height: 40px;
        }

        .mat-content {
          margin: 0 -24px;
        }

        &.email-opened {
          .email-toolbar {
            border-bottom: solid 1px #e0e0e0;

            .email-subject {
              font-size: 110%;
              font-weight: 100;
            }
          }
        }

        .email-body {
          position: relative;
          padding: 20px 24px;

          .email-from {
            font-weight: bold;
          }

          .email-body-toolbar {
            margin-bottom: 10px;
          }

          .email-to {
            color: #7a7a7a;
          }

          .email-more {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        }
      }

      .email-more-menu {
        width: 200px;
      }

      .snooze-menu {
        width: 200px;

        h3 {
          padding: 0 15px;
          margin: 5px 0;
        }

        button {
          font-size: 85%;
        }
      }
    `,
  ],
})
export class EmailDetailComponent {
  @HostBinding('class.email-opened')
  @Input()
  opened = false;

  @Input() avatar = '';
  @Input() from = '';
  @Input() subject = '';
  @Input() body = '';
  @Input() recieved = new Date();

  @Output() removed = new EventEmitter<void>();
  @Output() reply = new EventEmitter<{ to: string; subject: string }>();

  onOpenToggle(): void {
    this.opened = !this.opened;
  }

  onReply(): void {
    this.reply.emit({
      to: this.from,
      subject: `RE: ${this.subject}`,
    });
  }
}

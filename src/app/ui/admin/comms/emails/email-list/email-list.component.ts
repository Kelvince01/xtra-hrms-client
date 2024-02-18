import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EmailService } from '@data/services/comms.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ComposeMailComponent } from '../compose-mail/compose-mail.component';
import { EmailDetailComponent } from '../email-detail/email-detail.component';

interface IEmail {
  recieved: Date;
  avatar: string;
  from: string;
  subject: string;
  body: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-email-list',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    EmailDetailComponent,
    MatIconModule,
    FlexLayoutModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav-nav">
        <mat-list>
          <mat-list-item>
            <button mat-button routerLink="/" routerLinkActive>
              <mat-icon>inbox</mat-icon>
              Inbox
            </button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button routerLink="/snoozed" routerLinkActive>
              <mat-icon>alarm</mat-icon>
              Snoozed
            </button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button routerLink="/done" routerLinkActive>
              <mat-icon>done</mat-icon>
              Done
            </button>
          </mat-list-item>
          <mat-list-item>
            <hr />
          </mat-list-item>
          <mat-list-item>
            <button mat-button routerLink="/drafts" routerLinkActive>
              <mat-icon>drafts</mat-icon>
              Drafts
            </button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button routerLink="/sent" routerLinkActive>
              <mat-icon>send</mat-icon>
              Sent
            </button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button routerLink="/spam" routerLinkActive>
              <mat-icon>report_problem</mat-icon>
              Spam
            </button>
          </mat-list-item>
        </mat-list>
      </mat-sidenav>
      <div class="sidenav-content">
        <mat-toolbar color="primary" fxLayout="row" class="primary-toolbar">
          <div fxFlex="50px">
            <button type="button" class="menu-btn" mat-icon-button (click)="sidenav.open()">
              <mat-icon>menu</mat-icon>
            </button>
          </div>
          <div fxFlex="100px">Inbox</div>
          <div fxFlex fxFill class="search-col">
            <input type="text" class="search-bar" placeholder="Search..." />
            <mat-slide-toggle class="pin-toggle"></mat-slide-toggle>
          </div>
          <div fxFlex="200px" class="avatar-col">
            <span class="avatar accent-1 large">AM</span>
          </div>
        </mat-toolbar>
        <slot>
          <mat-list>
            <mat-list-item class="category-title">Today</mat-list-item>
            @for (email of emails; track email; let i = $index) {
              <mat-list-item>
                <xtra-email-detail
                  [avatar]="email.avatar"
                  [from]="email.from"
                  [subject]="email.subject"
                  [body]="email.body"
                  [recieved]="email.recieved"
                  (removed)="onRemove(i)"
                  (reply)="onNewMessage($event)"></xtra-email-detail>
              </mat-list-item>
            }
          </mat-list>
        </slot>
        <button
          mat-fab
          color="accent"
          class="new-fab"
          (click)="onNewMessage()"
          matTooltip="New Message"
          matTooltipPosition="before">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </mat-sidenav-container>
  `,
  styleUrls: ['./email-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [EmailService],
})
export default class EmailListComponent {
  // displayedColumns: string[] = ['from_account', 'from_email', 'subject', 'body', 'menu'];

  emails = emails;

  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  onRemove(index: number): void {
    const copy = [...this.emails];
    copy.splice(index, 1);
    this.emails = copy;
  }

  onNewMessage(data: any = {}): void {
    const dialogRef = this.dialog.open(ComposeMailComponent, {
      width: '75%',
      panelClass: 'compose-mail-dialog',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Email sent!', null as any, {
          duration: 2000,
        });
      }
    });
  }
}

export const emails: IEmail[] = [
  {
    recieved: new Date(),
    avatar: 'A',
    from: 'Austin McDaniel',
    subject: 'Angular is a open-source framework for building web applications',
    body: `
      <p>Learn one way to build applications with Angular and reuse your code and abilities to build
      apps for any deployment target. For web, mobile web, native mobile and native desktop.
      Learn one way to build applications with Angular and reuse your code and abilities to build
      apps for any deployment target. For web, mobile web, native mobile and native desktop.
      Learn one way to build applications with Angular and reuse your code and abilities to build
      apps for any deployment target. For web, mobile web, native mobile and native desktop.</p>

      <p>Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.</p>

      <p>Angular puts you in control over scalability. Meet huge data requirements by building data
      models on RxJS, Immutable.js or another push-model.
      Angular puts you in control over scalability. Meet huge data requirements by building data
      models on RxJS, Immutable.js or another push-model.
      Angular puts you in control over scalability. Meet huge data requirements by building data
      models on RxJS, Immutable.js or another push-model.</p>
    `,
  },
  {
    recieved: new Date(),
    avatar: 'J',
    from: 'Jeremy Elbourn',
    subject: 'Angular Material is a open-source UI framework based on Material design spec',
    body: `
      <p>Learn one way to build applications with Angular and reuse your code and abilities to build
      apps for any deployment target. For web, mobile web, native mobile and native desktop.</p>

      <p>Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.</p>

      <p>Angular puts you in control over scalability. Meet huge data requirements by building data
      models on RxJS, Immutable.js or another push-model.</p>
    `,
  },
];

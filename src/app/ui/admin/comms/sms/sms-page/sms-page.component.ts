import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-sms-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <mat-card>
      <mat-card-content class="flex-column justify-center items-center">
        <div class="grid grid-cols-3 gap-4"></div>
      </mat-card-content>
    </mat-card>
    <mat-card>
      <mat-card-content class="flex-column justify-center items-center">
        <mat-form-field>
          <!--          <input matInput placeholder="Email" type="email" [(ngModel)]="email" autocomplete="email" />-->
        </mat-form-field>

        <!--        <mat-slide-toggle [(ngModel)]="computerFirst">Computer Moves First</mat-slide-toggle>-->

        <mat-form-field>
          <mat-label>Difficulty</mat-label>
          <!--          <mat-select [(ngModel)]="difficulty">-->
          <!--            <mat-option value="Easy">Easy</mat-option>-->
          <!--            <mat-option value="Normal">Normal</mat-option>-->
          <!--            <mat-option value="Hard">Hard</mat-option>-->
          <!--          </mat-select>-->
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 2em auto;
        text-align: center;
      }

      .game-field {
        width: 48px;
        height: 48px;
        background-color: #f0f0f0;
        line-height: 48px;
        font-size: 32px;
        font-weight: bold;
      }

      .playing .game-field {
        cursor: pointer;
      }

      button,
      mat-slide-toggle {
        margin-bottom: 2rem;
      }

      .email-field-style.ng-touched.ng-invalid {
        #email {
          .mdc-text-field {
            border: 2px solid orange;
          }
        }
      }
    `,
  ],
})
export default class SmsPageComponent {}

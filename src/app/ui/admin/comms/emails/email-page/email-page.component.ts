import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {EmailService} from '@services/comms.service';
import {BasePageComponent} from '@shared/components/forms/base-page/base-page.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-email-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    TranslateModule,
    BasePageComponent,
    BasePageComponent,
  ],
  template: `
    <xtra-base-page [saveButtonDisabled]="form.invalid" (save)="save()">
      <span title>{{ 'emails.email-page' | translate }}</span>
      <span sub-title>New</span>
      <form [formGroup]="form">
        <mat-grid-list [cols]="2" rowHeight="64px">
          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'emails.caption.from_account' | translate"
                formControlName="from_account"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'emails.caption.from_email' | translate"
                formControlName="from_email"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'emails.caption.subject' | translate"
                formControlName="subject"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'emails.caption.body' | translate"
                formControlName="body"
              />
            </mat-form-field>
          </mat-grid-tile>
        </mat-grid-list>
      </form>
    </xtra-base-page>
  `,
  styles: [],
  providers: [EmailService],
})
export default class EmailPageComponent {
  form!: FormGroup;

  save(): void {}
}

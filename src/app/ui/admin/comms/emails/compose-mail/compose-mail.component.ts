import { ENTER } from '@angular/cdk/keycodes';

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RichTextEditorComponent } from '@shared/components/forms/rich-text-editor/rich-text-editor.component';
import { Observable, map, startWith } from 'rxjs';

const COMMA = 188;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-compose-mail',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    RichTextEditorComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="new-email-toolbar" mat-dialog-title>
      <mat-icon>drafts</mat-icon>
      <button mat-icon-button mat-dialog-close>
        <mat-icon>clear</mat-icon>
      </button>
    </div>
    <mat-dialog-content class="new-email-content">
      <mat-form-field class="recipients-list">
        <mat-chip-grid #chipList>
          @for (recipient of recipients; track recipient) {
            <mat-chip [removable]="true" (removed)="removeRecipient(recipient)">
              {{ recipient }}
              @if (true) {
                <mat-icon matChipRemove>cancel</mat-icon>
              }
            </mat-chip>
          }
          <input
            placeholder="To"
            matInput
            #recipientInput
            [formControl]="recipientsCtrl"
            [matAutocomplete]="auto"
            [matChipInputFor]="chipList"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            [matChipInputAddOnBlur]="false"
            (matChipInputTokenEnd)="addRecipient($event)" />
        </mat-chip-grid>
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onOptionSelected($event)">
          @for (option of filteredContacts | async; track option) {
            <mat-option [value]="option">
              {{ option }}
            </mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
      <mat-form-field class="subject-input">
        <input matInput placeholder="Subject" [formControl]="subjectCtrl" />
      </mat-form-field>
      <!--      <mat-form-field class="body-input">-->
      <!--        <textarea matInput placeholder="Body" [formControl]="bodyCtrl" rows="15"></textarea>-->
      <xtra-rich-text-editor></xtra-rich-text-editor>
      <!--      </mat-form-field>-->
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Send</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./compose-mail.component.scss'],
})
export class ComposeMailComponent {
  separatorKeysCodes = [ENTER, COMMA];

  contacts: string[] = [
    'Austin Mcdaniel',
    'Jeremy Elbourn',
    'Jules Kremer',
    'Brad Green',
    'Tina Gao',
  ];
  recipients: string[] = [];
  subjectCtrl = new FormControl();
  bodyCtrl = new FormControl();
  recipientsCtrl = new FormControl();
  filteredContacts: Observable<any[]>;

  @ViewChild('recipientInput') recipientInput: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.to && data.subject) {
      this.recipients.push(data.to);
      this.subjectCtrl.setValue(data.subject);
    }

    this.filteredContacts = this.recipientsCtrl.valueChanges.pipe(
      startWith(null),
      map(contact => (contact ? this.filterContacts(contact) : this.contacts.slice())),
    );
  }

  addRecipient(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.recipients.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeRecipient(recipient: string): void {
    const index = this.recipients.indexOf(recipient);
    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  filterContacts(name: string): string[] {
    return this.contacts.filter(contact => contact.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.recipients.push(event.option.value);
    this.recipientInput.nativeElement.value = '';
  }
}

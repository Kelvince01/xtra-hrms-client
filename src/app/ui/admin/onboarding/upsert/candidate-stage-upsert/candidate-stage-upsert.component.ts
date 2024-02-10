import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {AsyncSubject, Subject} from 'rxjs';
import {maxLength} from '@shared/components/forms/validators/maxlength.validator';
import {RichTextEditorComponent} from '@shared/components/forms/rich-text-editor/rich-text-editor.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'xtra-candidate-stage-upsert',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatCardActions,
    MatFormField,
    RichTextEditorComponent,
    MatButton,
  ],
  template: `
    <mat-card class="blog mat-elevation-z3">
      <mat-card-title>Add Candidate Stage</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="myForm">
          <mat-form-field class="title">
            <input matInput [formControl]="myForm.controls.title" placeholder="Title" type="text" />

            <mat-error *ngIf="myForm.controls.title.hasError('required')">
              Title is required
            </mat-error>
          </mat-form-field>

          <div class="mat-form-field-wrapper">
            <xtra-rich-text-editor></xtra-rich-text-editor>
            <div class="mat-form-field-subscript-wrapper">
              <mat-error *ngIf="myForm.controls.body.hasError('maxlength')">
                Your post exceeds exceeds the character limit
                {{ myForm.controls.body.getError('maxlength').actualLength }} /
                {{ myForm.controls.body.getError('maxlength').requiredLength }}
              </mat-error>
              <mat-error
                *ngIf="myForm.controls.body.touched && myForm.controls.body.hasError('required')"
              >
                This form is required
              </mat-error>
            </div>
          </div>
        </form>
      </mat-card-content>

      <mat-card-actions align="end">
        <button mat-raised-button (click)="onSubmit()" [disabled]="!myForm.valid">Submit</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .title {
        width: 100%;
        margin-bottom: 15px;
      }

      .blog {
        width: 70%;
        max-width: 600px;
        margin: auto;
      }
    `,
  ],
})
export class CandidateStageUpsertComponent {
  private editorSubject: Subject<any> = new AsyncSubject();
  public myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required, maxLength(this.editorSubject, 10)),
  });

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  public onSubmit() {
    console.log('Submitted!');
  }
}

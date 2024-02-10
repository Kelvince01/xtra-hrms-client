import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, tap} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ITraining} from '@data/models/training.model';
import {TrainingsService} from '@services/training.service';
import {ButtonComponent} from '@shared/components/forms/button/button.component';
import {DateUtil} from '@core/utils/date.util';
import {NoWhitespaceValidator} from '@shared/components/forms/validators/no-whitespace.validator';
import {DialogService} from '@shared/services/dialog.service';
import {QuillEditorComponent} from 'ngx-quill';
import {AutofocusDirective} from '@shared/directives/autofocus.directive';
import {quillConfiguration} from '@shared/config/editor';

@Component({
  selector: 'xtra-training-upsert',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ReactiveFormsModule,
    QuillEditorComponent,
    AutofocusDirective,
  ],
  template: `
    <div class="px-8 py-5">
      <div class="flex items-center py-3 text-textDarkest">
        <div class="text-xl">Create issue</div>
        <div class="flex-auto"></div>
        <xtra-button
          icon="times"
          [iconSize]="24"
          (click)="closeModal()"
          [className]="'btn-empty'"
        ></xtra-button>
      </div>
      <form class="issue-form" [formGroup]="issueForm">
        <div class="form-group">
          <label class="label">Issue type</label>
          <!--          <issue-type-select [control]="f?.type"></issue-type-select>-->
        </div>
        <div class="mt-3 form-group">
          <label class="label">Issue priority</label>
          <!--          <issue-priority-select [control]="f?.priority"></issue-priority-select>-->
        </div>
        <div class="mt-3 form-group">
          <label class="label">Short summary</label>
          <input class="form-input" formControlName="title" xtraAutofocus [timerDelay]="500" />
        </div>
        <div class="mt-3 form-group">
          <label class="label">Description</label>
          <quill-editor
            class="content-editor"
            [styles]="{'min-height': '120px'}"
            [modules]="editorOptions"
            formControlName="description"
            [placeholder]="''"
          ></quill-editor>
        </div>
        <div class="mt-3 form-group">
          <label class="label">Reporter</label>
          <!--issue-reporter-select
            [control]="f?.reporterId"
            [users]="reporterUsers$ | async"
          ></issue-reporter-select-->
        </div>
        <div class="mt-3 form-group">
          <label class="label">Assignees</label>
          <!--issue-assignees-select
            [control]="f.userIds"
            [users]="assignees$ | async"
          ></issue-assignees-select-->
        </div>
        <div class="mt-5 form-group form-action">
          <xtra-button
            className="btn-primary mr-2"
            type="submit"
            [disabled]="issueForm.invalid"
            (click)="submitForm()"
          >
            Create Issue
          </xtra-button>
          <xtra-button className="btn-empty" (click)="cancel()">Cancel</xtra-button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form-action {
        text-align: right;
      }
    `,
  ],
  providers: [TrainingsService],
})
export class TrainingUpsertComponent implements OnInit {
  reporterUsers$!: Observable<ITraining[]>;
  assignees$!: Observable<ITraining[]>;
  issueForm!: FormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: DialogService,
    private _projectService: TrainingsService,
    // private _projectQuery: ProjectQuery,
  ) {}

  ngOnInit(): void {
    this.initForm();
    // this.reporterUsers$ = this._projectQuery.users$.pipe(
    //   takeUntilDestroyed(),
    //   tap((users) => {
    // const [user] = users;
    // if (user) {
    //   this.f.reporterId.patchValue(user.id);
    // }
    // }),
    // );

    // this.assignees$ = this._projectQuery.users$;
  }

  initForm() {
    this.issueForm = this._fb.group({
      // type: [IssueType.TASK],
      // priority: [IssuePriority.MEDIUM],
      title: ['', NoWhitespaceValidator()],
      description: [''],
      reporterId: [''],
      userIds: [[]],
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    const now = DateUtil.getNow();
    const issue: ITraining = {
      ...this.issueForm.getRawValue(),
      // id: IssueUtil.getRandomId(),
      // status: IssueStatus.BACKLOG,
      created_at: now,
      updated_at: now,
    };

    this._projectService.update(issue);
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._modalRef.matDialog.closeAll();
  }
}

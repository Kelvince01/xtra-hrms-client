import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IArticle} from '@models/cms.model';
import {IUser} from '@data/models';
import {Observable} from 'rxjs';
import {Field} from '@stores/forms';
import {ListErrorsComponent} from '@shared/components/forms/list-errors';
import {DynamicFormComponent} from '@shared/components/forms/dynamic-form';

@Component({
  selector: 'xtra-add-comment',
  standalone: true,
  imports: [ListErrorsComponent, DynamicFormComponent],
  template: `
    <xtra-list-errors></xtra-list-errors>

    <div class="card comment-form">
      <xtra-dynamic-form
        class="card-block"
        (updateForm)="updateForm.emit($event)"
        [data$]="data$"
        [structure$]="structure$"
        [touchedForm$]="touchedForm$"
      ></xtra-dynamic-form>
      <div class="card-footer">
        <img [src]="currentUser.photo" class="comment-author-img" />
        <button
          (click)="submitComment.emit(article.slug)"
          class="btn btn-sm btn-primary"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  @Input() article!: IArticle;
  @Input() currentUser!: IUser;
  @Input() data$!: Observable<any>;
  @Input() structure$!: Observable<Field[]>;
  @Input() touchedForm$!: Observable<boolean>;
  @Output() submitComment: EventEmitter<string> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
}

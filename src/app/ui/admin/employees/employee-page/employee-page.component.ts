import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  DestroyRef,
  effect,
  untracked,
} from '@angular/core';
import {Field} from '@stores/forms';
import {Validators} from '@angular/forms';
import {ListErrorsComponent} from '@shared/components/forms/list-errors';
import {DynamicFormComponent} from '@shared/components/forms/dynamic-form';
import {Store} from '@ngrx/store';
import {ArticleStore} from '@stores/employees';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';
import {articleEditActions} from '@stores/employees';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'title',
    placeholder: 'Article Title',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'description',
    placeholder: "What's this article about?",
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    name: 'body',
    placeholder: 'Write your article (in markdown)',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'tagList',
    placeholder: 'Enter Tags',
    validator: [],
  },
];

@Component({
  selector: 'xtra-employee-page',
  standalone: true,
  imports: [ListErrorsComponent, DynamicFormComponent],
  template: `
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <xtra-list-errors></xtra-list-errors>

            <xtra-dynamic-form
              (updateForm)="updateForm($event)"
              [data$]="data$"
              [structure$]="structure$"
            ></xtra-dynamic-form>

            <button class="btn btn-lg pull-xs-right btn-primary" type="button" (click)="submit()">
              Publish Article
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly articleStore = inject(ArticleStore);
  private readonly destroyRef = inject(DestroyRef);

  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  readonly setArticleDataToForm = effect(() => {
    // const articleLoaded = this.articleStore.getArticleLoaded();
    const articleLoaded = this.articleStore.getEmployeeLoaded();
    if (articleLoaded) {
      untracked(() =>
        this.store.dispatch(formsActions.setData({data: this.articleStore.employee()})),
      );
    }
  });

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({structure}));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({data: changes}));
  }

  submit() {
    this.store.dispatch(articleEditActions.publishArticle());
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeForm());
  }
}

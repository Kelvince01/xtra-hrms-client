import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {articleListQuery} from '@stores/employees';
import {articleListActions, articlesActions} from '@stores/employees';
import {EmployeeListItemComponent} from './employee-list-item/employee-list-item.component';
import {AsyncPipe} from '@angular/common';
import {PagerComponent} from '@shared/components';
import {ArticleStore} from '@stores/employees';

@Component({
  selector: 'xtra-employee-list',
  standalone: true,
  imports: [EmployeeListItemComponent, AsyncPipe, PagerComponent],
  template: `
    @if (!(isLoading$ | async)) {
      @for (article of articles$ | async; track article.id) {
        <xtra-employee-list-item
          data-e2e-id="article-list"
          [employee]="article"
        ></xtra-employee-list-item>
      } @empty {
        <div>No articles are here... yet.</div>
      }

      <xtra-pager
        (setPage)="setPage($event)"
        [currentPage]="(listConfig$ | async)?.currentPage"
        [totalPages]="totalPages$ | async"
      ></xtra-pager>
    } @else {
      <div>Loading articles...</div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly articleStore = inject(ArticleStore);

  totalPages$ = this.store.select(articleListQuery.selectTotalPages);
  articles$ = this.store.select(articleListQuery.selectArticleEntities);
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  isLoading$ = this.store.select(articleListQuery.isLoading);

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.store.dispatch(articleListActions.setListPage({page}));
  }

  delete(id: number) {
    this.articleStore.deleteArticle(id);
  }
}

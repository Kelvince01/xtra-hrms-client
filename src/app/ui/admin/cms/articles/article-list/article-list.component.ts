import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ArticleListItemComponent} from '@admin-ui/cms/articles/article-list/article-list-item/article-list-item.component';
import {AsyncPipe} from '@angular/common';
import {PagerComponent} from '@shared/components';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {articleListActions, articleListQuery, articlesActions} from '@stores/cms/articles';

@Component({
  selector: 'xtra-article-list',
  standalone: true,
  imports: [ArticleListItemComponent, AsyncPipe, PagerComponent],
  template: `
    @if (!(isLoading$ | async)) {
      @for (article of articles$ | async; track article.slug) {
        <xtra-article-list-item
          data-e2e-id="article-list"
          (navigateToArticle)="navigateToArticle($event)"
          (unFavorite)="unFavorite($event)"
          (favorite)="favorite($event)"
          [article]="article"
        ></xtra-article-list-item>
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
export class ArticleListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  totalPages$ = this.store.select(articleListQuery.selectTotalPages);
  articles$ = this.store.select(articleListQuery.selectArticleEntities);
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  isLoading$ = this.store.select(articleListQuery.isLoading);

  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({slug}));
  }

  unFavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({slug}));
  }

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.store.dispatch(articleListActions.setListPage({page}));
  }
}

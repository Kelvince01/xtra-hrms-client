import {ChangeDetectionStrategy, Component, effect, inject, untracked} from '@angular/core';
import {
  articleListActions,
  articleListInitialState,
  articleListQuery,
  ListType,
} from '@stores/cms/articles';
import {Store} from '@ngrx/store';
import {AuthStore} from '@stores/auth';
import {HomeStoreService} from './home.store';
import {AsyncPipe, NgClass} from '@angular/common';
import {provideComponentStore} from '@ngrx/component-store';
import {ArticleListComponent} from '@admin-ui/cms/articles/article-list/article-list.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'xtra-home',
  standalone: true,
  imports: [NgClass, AsyncPipe, ArticleListComponent, TagListComponent],
  template: `
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              @if ({listConfig: listConfig$ | async}; as model) {
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a
                      [ngClass]="{active: model.listConfig?.type === 'FEED'}"
                      class="nav-link"
                      (click)="setListTo('FEED')"
                    >
                      Your Feed
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      data-e2e-id="global-feed"
                      [ngClass]="{
                        active: model.listConfig?.type === 'ALL' && !model.listConfig?.filters?.tag
                      }"
                      class="nav-link"
                      (click)="setListTo('ALL')"
                    >
                      Global Feed
                    </a>
                  </li>
                  <li class="nav-item" [hidden]="!model.listConfig?.filters?.tag">
                    <a class="nav-link active">
                      <i class="ion-pound"></i>
                      {{ model.listConfig?.filters?.tag }}
                    </a>
                  </li>
                </ul>
              }
            </div>

            <xtra-article-list></xtra-article-list>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              @defer (when (tags$ | async)!.length>0) {
                <xtra-tag-list
                  (setListTag)="setListTag($event)"
                  [tags]="(tags$ | async)!"
                ></xtra-tag-list>
              } @placeholder {
                loading...
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .nav-link {
        cursor: pointer;
      }

      .tag-pill {
        cursor: pointer;
      }
    `,
  ],
  providers: [provideComponentStore(HomeStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly homeStore = inject(HomeStoreService);

  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  tags$: Observable<string[]> = this.homeStore.tags$;

  readonly loadArticlesOnLogin = effect(() => {
    const isLoggedIn = this.authStore.isAuthenticated();
    untracked(() => this.getArticles(isLoggedIn));
  });

  setListTo(type: ListType = 'ALL') {
    this.store.dispatch(
      articleListActions.setListConfig({config: {...articleListInitialState.listConfig, type}}),
    );
  }

  getArticles(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.store.dispatch(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            tag,
          },
        },
      }),
    );
  }
}

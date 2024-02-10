import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  computed,
} from '@angular/core';
import {AuthStore} from '@data/store/auth';
import {ArticleStore, articlesActions} from '@data/store/cms/articles';
import {Field, formsActions, ngrxFormsQuery} from '@data/store/forms';
import {Store} from '@ngrx/store';
import {MarkdownPipe} from '@admin-ui/cms/articles/article/pipes/markdown.pipe';
import {RouterLink} from '@angular/router';
import {ArticleMetaComponent} from '@admin-ui/cms/articles/article/article-meta/article-meta.component';
import {AddCommentComponent} from '@admin-ui/cms/articles/article/add-comment/add-comment.component';
import {ArticleCommentComponent} from '@admin-ui/cms/articles/article/article-comment/article-comment.component';

const structure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Write a comment...',
    attrs: {
      rows: 3,
    },
  },
];

@Component({
  selector: 'xtra-article',
  standalone: true,
  imports: [
    MarkdownPipe,
    RouterLink,
    ArticleMetaComponent,
    AddCommentComponent,
    ArticleCommentComponent,
  ],
  template: `
    @if ($article(); as article) {
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1 data-e2e-id="article-title">{{ article.title }}</h1>
            <xtra-article-meta
              [article]="article"
              (follow)="follow($event)"
              (unfollow)="unfollow($event)"
              (favorite)="favorite($event)"
              (unfavorite)="unfavorite($event)"
              (delete)="delete($event)"
              [canModify]="$canModify()"
            ></xtra-article-meta>
          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              <div [innerHTML]="article.body! | markdown"></div>
            </div>
          </div>
          <hr />
          <div class="article-actions">
            <xtra-article-meta
              [article]="article"
              (follow)="follow($event)"
              (unfollow)="unfollow($event)"
              (favorite)="favorite($event)"
              (unfavorite)="unfavorite($event)"
              (delete)="delete($event)"
              [canModify]="$canModify()"
            ></xtra-article-meta>
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              @if ($isAuthenticated()) {
                <xtra-add-comment
                  [article]="article"
                  [data$]="data$"
                  [structure$]="structure$"
                  [currentUser]="$currentUser()"
                  [touchedForm$]="touchedForm$"
                  (submitComment)="submit($event)"
                  (updateForm)="updateForm($event)"
                ></xtra-add-comment>
              } @else {
                <a [routerLink]="['/login']">Sign in</a>
                or
                <a [routerLink]="['/register']">sign up</a>
                to add comments on this article.
              }

              @for (comment of $comments(); track comment.id) {
                <xtra-article-comment
                  [currentUser]="$currentUser()"
                  (delete)="deleteComment($event)"
                  [article]="article"
                  [comment]="comment"
                ></xtra-article-comment>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  @Input() slug = '';

  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly articleStore = inject(ArticleStore);

  $article = this.articleStore.data;
  $comments = this.articleStore.comments;
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  touchedForm$ = this.store.select(ngrxFormsQuery.selectTouched);

  $authorUsername = (this.articleStore.data as any).Author()!.username!;
  $isAuthenticated = this.authStore.isAuthenticated;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user()?.username === this.$authorUsername);

  ngOnInit() {
    this.articleStore.getArticle(Number(this.slug));
    this.articleStore.getComments(this.slug);
    this.store.dispatch(formsActions.setStructure({structure}));
    this.store.dispatch(formsActions.setData({data: ''}));
  }

  follow(username: string) {
    this.articleStore.followUser(username);
  }
  unfollow(username: string) {
    this.articleStore.unfollowUser(username);
  }
  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({slug}));
  }
  unfavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({slug}));
  }
  delete(slug: string) {
    this.articleStore.deleteArticle(Number(slug));
  }
  deleteComment(data: {commentId: number; slug: string}) {
    this.articleStore.deleteComment(data);
  }
  submit(slug: string) {
    this.articleStore.addComment(slug);
  }
  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({data: changes}));
  }

  ngOnDestroy() {
    this.articleStore.initializeArticle();
  }
}

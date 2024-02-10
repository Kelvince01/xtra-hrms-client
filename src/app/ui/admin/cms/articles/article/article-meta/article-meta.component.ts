import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IArticle} from '@data/models/cms.model';
import {RouterLink} from '@angular/router';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'xtra-article-meta',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass],
  template: `
    <div class="article-meta">
      <a [routerLink]="['/profile', article.Author?.username]">
        <img [src]="article.Author?.image" />
      </a>
      <div class="info">
        <a class="author" [routerLink]="['/profile', article.Author?.username]">
          {{ article.Author?.username }}
        </a>
        <span class="date">{{ article.created_at | date: 'longDate' }}</span>
      </div>

      <span [hidden]="!canModify">
        <a class="btn btn-sm btn-outline-secondary" [routerLink]="['/editor', article.slug]">
          <i class="ion-edit"></i>
          Edit Article
        </a>

        <button class="btn btn-sm btn-outline-danger" (click)="deleteArticle()">
          <i class="ion-trash-a"></i>
          Delete Article
        </button>
      </span>

      <span [hidden]="canModify">
        <button
          class="btn btn-sm action-btn"
          [ngClass]="{
            'btn-outline-secondary': !article.Author?.following,
            'btn-secondary': article.Author?.following
          }"
          (click)="toggleFollow()"
        >
          <i class="ion-plus-round"></i>
          &nbsp; {{ article.Author?.following ? 'Unfollow' : 'Follow' }}
          {{ article.Author?.username }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm btn-outline-primary"
          [ngClass]="{
            'btn-outline-primary': !article.favorited,
            'btn-primary': article.favorited
          }"
          (click)="toggleFavorite()"
        >
          <i class="ion-heart"></i>
          &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
          <span class="counter">({{ article.favoritesCount }})</span>
        </button>
      </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent {
  @Input() article!: IArticle;
  @Input() isAuthenticated!: boolean;
  @Input() canModify!: boolean;
  @Output() follow: EventEmitter<string> = new EventEmitter<string>();
  @Output() unfollow: EventEmitter<string> = new EventEmitter<string>();
  @Output() unfavorite: EventEmitter<string> = new EventEmitter();
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  toggleFavorite() {
    if (this.article.favorited) {
      this.unfavorite.emit(this.article.slug);
    } else {
      this.favorite.emit(this.article.slug);
    }
  }

  toggleFollow() {
    if (this.article.Author?.following) {
      this.unfollow.emit(this.article.Author.username);
    } else {
      this.follow.emit(this.article.Author?.username);
    }
  }

  deleteArticle() {
    this.delete.emit(this.article.slug);
  }
}

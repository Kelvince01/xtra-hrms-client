import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IArticle} from '@data/models/cms.model';
import {RouterLink} from '@angular/router';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'xtra-article-list-item',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass],
  template: `
    <div class="article-preview">
      <div class="article-meta">
        <a>
          <img [src]="article.Author?.image" />
        </a>
        <div class="info">
          <a
            data-e2e-id="article-author"
            class="author"
            [routerLink]="['/profile', article.Author?.username]"
          >
            {{ article.Author?.username }}
          </a>
          <span class="date">
            {{ article.created_at | date: 'longDate' }}
          </span>
        </div>
        <button
          [ngClass]="{
            'btn-outline-primary': !article.favorited,
            'btn-primary': article.favorited
          }"
          class="btn btn-sm pull-xs-right"
          (click)="toggleFavorite(article)"
        >
          <i class="ion-heart"></i>
          {{ article.favoritesCount }}
        </button>
      </div>
      <a (click)="navigateToArticle.emit(article.slug)" class="preview-link">
        <h1 data-e2e-id="article-list-title">{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          @for (tag of article.tagList; track tag) {
            <li class="tag-default tag-pill tag-outline">
              {{ tag }}
            </li>
          }
        </ul>
      </a>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  @Input() article!: IArticle;
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() unFavorite: EventEmitter<string> = new EventEmitter();
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();

  toggleFavorite(article: IArticle) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}

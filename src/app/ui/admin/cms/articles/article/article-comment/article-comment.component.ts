import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {IUser} from '@data/models';
import {IArticle, IComment} from '@data/models/cms.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'xtra-article-comment',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <a class="comment-author" [routerLink]="['/profile', comment.Author?.username]">
          <img [src]="comment.Author?.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a class="comment-author" [routerLink]="['/profile', comment.Author?.username]">
          {{ comment.Author?.username }}
        </a>
        <span class="date-posted">
          {{ comment.created_at | date: 'longDate' }}
        </span>
        <span class="mod-options" [hidden]="currentUser.username !== comment.Author?.username">
          <i
            class="ion-trash-a"
            (click)="delete.emit({commentId: comment.id!, slug: article.slug!})"
          ></i>
        </span>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() currentUser!: IUser;
  @Input() comment!: IComment;
  @Input() article!: IArticle;
  @Output() delete: EventEmitter<{
    commentId: number;
    slug: string;
  }> = new EventEmitter();
}

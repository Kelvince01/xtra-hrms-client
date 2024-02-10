import {Injectable, inject} from '@angular/core';
import {BaseService} from '@services/base.service';
import {
  ArticleResponse,
  IArticle,
  MultipleCommentsResponse,
  SingleCommentResponse,
} from '@data/models/cms.model';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {ArticleListConfig} from '@data/store/cms/articles';
import {HttpParams} from '@angular/common/http';
import {ProfileResponse} from '@data/models';

@Injectable({providedIn: 'root'})
export class ArticlesService extends BaseService<IArticle> {
  override collectionName = 'articles';

  private readonly apiService = inject(ApiService);

  publish(article: IArticle): Observable<ArticleResponse> {
    if (article.slug) {
      return this.apiService.put<ArticleResponse, ArticleResponse>('/articles/' + article.slug, {
        article: article,
      });
    }
    return this.apiService.post<ArticleResponse, ArticleResponse>('/articles/', {article: article});
  }

  query(config: ArticleListConfig): Observable<{articles: IArticle[]; articlesCount: number}> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters),
    );
  }

  // TODO: remove any
  private toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams(),
    );
  }
}

@Injectable({providedIn: 'root'})
export class ActionsService {
  private readonly apiService = inject(ApiService);

  followUser(username: string): Observable<ProfileResponse> {
    return this.apiService.post<ProfileResponse, void>('/profiles/' + username + '/follow');
  }

  unfollowUser(username: string): Observable<ProfileResponse> {
    return this.apiService.delete<ProfileResponse>('/profiles/' + username + '/follow');
  }

  favorite(slug: string): Observable<ArticleResponse> {
    return this.apiService.post<ArticleResponse, void>('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<ArticleResponse> {
    return this.apiService.delete<ArticleResponse>('/articles/' + slug + '/favorite');
  }
}

@Injectable({providedIn: 'root'})
export class CommentsService {
  private readonly apiService = inject(ApiService);

  getComments(slug: string): Observable<MultipleCommentsResponse> {
    return this.apiService.get<MultipleCommentsResponse>(`/articles/${slug}/comments`);
  }

  deleteComment(commentId: number, slug: string): Observable<void> {
    return this.apiService.delete<void>(`/articles/${slug}/comments/${commentId}`);
  }

  addComment(slug: string, payload = ''): Observable<SingleCommentResponse> {
    return this.apiService.post<SingleCommentResponse, {comment: {body: string}}>(
      `/articles/${slug}/comments`,
      {
        comment: {body: payload},
      },
    );
  }
}

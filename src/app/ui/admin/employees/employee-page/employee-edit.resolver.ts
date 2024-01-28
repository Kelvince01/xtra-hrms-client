import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {of} from 'rxjs';
import {ArticleStore} from '@stores/employees';

export const articleEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  const articleStore = inject(ArticleStore);

  if (id) {
    articleStore.getArticle(id);
  }

  return of(true);
};

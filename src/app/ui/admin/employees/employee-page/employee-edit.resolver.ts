import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import {ArticleStore} from "../../../../data/store/employees/employee.store";

export const articleEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  const articleStore = inject(ArticleStore);

  if (id) {
    articleStore.getArticle(id);
  }

  return of(true);
};

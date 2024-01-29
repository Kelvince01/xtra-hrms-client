import {Injectable} from '@angular/core';
import {BaseService} from '@services/base.service';
import {IArticle} from '@data/models/cms.model';

@Injectable({providedIn: 'root'})
export class ArticlesService extends BaseService<IArticle> {
  override collectionName = 'articles';
}

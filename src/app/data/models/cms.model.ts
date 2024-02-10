/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {IBaseModel} from '@models/base.model';
import {IProfile} from '@models/accounts.model';

export interface ICategory extends IBaseModel {
  name?: string;
  slug?: string;
}

export interface IArticle extends IBaseModel {
  author?: number;
  body?: string;
  description?: string;
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  tagList?: string | string[];
  title?: string;
  categories?: number[];
  likes?: number[];
  thumbnail?: any;
  tags?: string;
  status?: number;
  views?: number;
  published?: boolean;
  extra_info?: string;
  file?: any;
  publish_date?: Date;
  Author?: IProfile;
}

export interface IComment extends IBaseModel {
  author?: number;
  body: string;
  article?: number;
  name?: string;
  email?: string;
  active?: boolean;
  parent_comment?: number;
  Author?: IProfile;
}

export interface IReaction extends IBaseModel {
  reaction_type?: string;
  user?: number;
  post?: number;
  comment?: number;
}

export interface ArticleState {
  data: IArticle;
  comments: IComment[];
}

export interface SingleCommentResponse {
  comment: IComment;
}

export interface MultipleCommentsResponse {
  comments: IComment[];
}

export interface ArticleResponse {
  article: IArticle;
}

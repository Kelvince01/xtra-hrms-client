/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {BaseModel} from '@models/base.model';

export interface ICategory extends BaseModel {
  name?: string;
  slug?: string;
}

export interface IArticle extends BaseModel {
  author?: number;
  body?: string;
  description?: string;
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  tagList?: string;
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
}

export interface IComment extends BaseModel {
  author?: number;
  body?: string;
  article?: number;
  name?: string;
  email?: string;
  active?: boolean;
  parent_comment?: number;
}

export interface IReaction extends BaseModel {
  reaction_type?: string;
  user?: number;
  post?: number;
  comment?: number;
}

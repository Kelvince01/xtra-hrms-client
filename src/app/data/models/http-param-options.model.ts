/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {SortDirection} from '@angular/material/sort';

export interface IOptions {
  limit?: number;
  offset?: number;
  sortOrder?: SortDirection;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortActive?: string;
}

/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';

export const assetsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./asset-list/asset-list.component').then((c) => c.AssetListComponent),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./asset-page/asset-page.component').then((c) => c.AssetPageComponent),
    title: 'New Asset',
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./asset-page/asset-page.component').then((c) => c.AssetPageComponent),
    title: 'Edit Asset',
  },
  {
    path: 'assign',
    loadComponent: () =>
      import('./asset-assign/asset-assign.component').then((c) => c.AssetAssignComponent),
    title: 'Assign Asset',
  },
  {
    path: 'assigned',
    loadComponent: () =>
      import('./asset-list/asset-list.component').then((c) => c.AssetListComponent),
    data: {revalidate: 60},
  },
];

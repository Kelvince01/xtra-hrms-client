/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleEffects, articleListFeature } from '@stores/cms/articles';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [provideState(articleListFeature), provideEffects(articleEffects)],
  },
];

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {enableProdMode, isDevMode} from '@angular/core';
import {initSentry} from './sentry.config';
import {environment} from './environments/environment.development';

if (environment.production) {
  enableProdMode();
}

if (!isDevMode()) initSentry();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

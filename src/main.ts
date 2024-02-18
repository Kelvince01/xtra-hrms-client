import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment.development';
import { initSentry } from './sentry.config';

if (environment.production) {
  enableProdMode();
}

if (!isDevMode()) initSentry();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

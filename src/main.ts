import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {isDevMode} from '@angular/core';
import {initSentry} from './sentry.config';

if (!isDevMode()) initSentry();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

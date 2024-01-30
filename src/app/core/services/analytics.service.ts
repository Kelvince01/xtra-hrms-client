import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Location} from '@angular/common';

declare const ga: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private enabled: boolean;

  constructor(
    private location: Location,
    private router: Router,
  ) {
    this.enabled = false;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        ga('send', {hitType: 'pageview', page: this.location.path()});
      });
    }
  }

  trackEvent(eventName: string) {
    if (this.enabled) {
      ga('send', 'event', eventName);
    }
  }
}
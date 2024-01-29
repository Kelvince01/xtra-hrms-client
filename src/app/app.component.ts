import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SeoService} from '@core/services/seo-v2.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AnalyticsService} from '@core/services/analytics.service';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'xtra-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  template: `
    <div>
      <ngx-spinner
        bdColor="rgba(0,0,0,0.2)"
        size="medium"
        color="#0049AF"
        type="ball-spin-clockwise-fade"
      >
        <p style="font-size: 20px; color: white">Loading...</p>
      </ngx-spinner>
      <router-outlet />
    </div>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  title = 'Xtra HRMS (Client)';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(SeoService) private seoService: SeoService,
    @Inject(AnalyticsService) private analytics: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        map((e) => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const seoData = data['seo'];
        if (seoData) {
          this.seoService.updateTitle(seoData['title']);
          this.seoService.updateMetaTags(seoData['metaTags']);
        }
      });

    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}

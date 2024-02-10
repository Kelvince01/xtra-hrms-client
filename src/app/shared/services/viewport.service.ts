import {inject, Injectable} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';

// Use this service to get viewport size.
@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  breakpointSubscription: any;
  mobileViewport: boolean = false;
  private breakpointObserver = inject(BreakpointObserver);
  /*private changeDetectorRef = inject(ChangeDetectorRef);
  mobileQuery!: MediaQueryList;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
  private mobileQueryListener!: (ev: MediaQueryListEvent) => void;*/

  constructor(private media: MediaMatcher) {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 720px)'])
      .subscribe((result) => {
        const small = Object.keys(result.breakpoints)[0];
        this.mobileViewport = result.breakpoints[small];
      });

    /*this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.mobileQueryListener = (_) => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);*/
  }

  isSmall(): boolean {
    return this.mobileViewport;
  }
}

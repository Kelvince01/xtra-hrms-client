import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {Injectable, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeoService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly dom: Document;
  private readonly isBrowser: boolean;
  private linkCanonical!: HTMLLinkElement;

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.dom = document;

    if (this.isBrowser) {
      this.createCanonicalTag();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }
  updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach((m) => this.meta.updateTag(m));
  }

  createCanonicalTag() {
    this.linkCanonical = this.dom.createElement('link');
    this.linkCanonical.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(this.linkCanonical);
    this.linkCanonical.setAttribute('href', this.getCanonicalUrl());
  }

  trackCanonicalChanges() {
    if (!this.isBrowser) {
      return;
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.linkCanonical.setAttribute('href', this.getCanonicalUrl());
      });
  }

  private getCanonicalUrl(): string {
    return this.dom.location.origin + this.dom.location.pathname;
  }
}

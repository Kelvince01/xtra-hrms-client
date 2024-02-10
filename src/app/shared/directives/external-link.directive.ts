/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Directive, ElementRef, HostBinding, inject, OnInit} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'a:not([noBlank])',
  standalone: true,
})
export class ExternalLinkDirective implements OnInit {
  private readonly elRef: ElementRef<HTMLAnchorElement> = inject(ElementRef);

  @HostBinding('target') target?: '_blank' | '_self' | '_parent' | '_top' | '';

  ngOnInit() {
    this.setAnchorTarget();
  }

  private setAnchorTarget() {
    if (this.isLinkExternal(this.elRef.nativeElement.href)) {
      this.target = '_blank';
    }
  }

  private isLinkExternal = (url: string) => new URL(url).origin !== location.origin;
}

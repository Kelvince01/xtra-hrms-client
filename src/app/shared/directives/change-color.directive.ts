/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[colorChangeEvent]',
  exportAs: 'colorChange',
  standalone: true,
})
export class ColorChangeDirective {
  constructor() {}

  @HostBinding('style.color') textColor?: string;
  @Input() mycolor?: string;

  @HostListener('click', ['$event'])
  clickingElement(event: any) {
    this.changeColor();
  }

  changeColor(someColor?: string) {
    this.textColor = someColor ? someColor : this.mycolor;
  }
}

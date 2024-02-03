import {Component, HostBinding, Input, OnChanges, OnInit} from '@angular/core';

/**
 * [Spacer Component](https://xtra-ui-components.github.io/angular/?path=/info/components-spacer--readme)
 *
 * An invisible utility component that acts as a spacer element in various layouts.
 * It works with flexbox sizing or fixed sizing.
 */
@Component({
  selector: 'xtra-ui-spacer',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
})
export class UiSpacerComponent implements OnChanges, OnInit {
  /** Flex grow/shrink value for use in flex layouts
   *
   * @default 1
   * */
  @Input() flex = 1;
  /** Height (in px) for static layouts */
  @HostBinding('style.height.px') @Input() height: number = 0;
  /** Width (in px) for static layouts */
  @HostBinding('style.width.px') @Input() width: number = 0;
  @HostBinding('style.flex') grow: string = '';
  @HostBinding('style.display') display = 'flex';

  ngOnInit(): void {
    this.calcGrow();
  }

  ngOnChanges(): void {
    this.calcGrow();
  }

  calcGrow(): void {
    this.grow = undefined!;
    if (!this.height && !this.width) {
      this.grow = `${this.flex} ${this.flex} ${this.flex === 0 ? 'auto' : '0px'}`;
    }
  }
}

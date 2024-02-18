import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[xtraHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('xtraHighlight') highlightColor: string = 'yellow';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.highlight();
  }

  private highlight() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor);
  }
}

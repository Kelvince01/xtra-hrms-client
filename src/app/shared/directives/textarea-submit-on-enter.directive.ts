import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[xtraTextareaSubmitOnEnter]',
  standalone: true,
})
export class TextareaSubmitOnEnterDirective {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSubmit: EventEmitter<void> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();

      this.elementRef.nativeElement.blur();

      this.onSubmit.emit();
    }
  }
}

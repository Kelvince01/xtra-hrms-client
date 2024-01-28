import {Directive, ElementRef, HostListener, Input} from '@angular/core';

/*
<input type="text" placeholder="Enter text" [xtraMinLength]="5" required>
 */
@Directive({
  selector: '[xtraMinLength]',
  standalone: true,
})
export class MinLengthDirective {
  @Input('xtraMinLength') minLength: number = 0;
  constructor(private el: ElementRef) {}
  @HostListener('input') onInput() {
    const inputValue: string = this.el.nativeElement.value;
    if (inputValue.length < this.minLength) {
      this.el.nativeElement.setCustomValidity(`Minimum length is ${this.minLength} characters.`);
    } else {
      this.el.nativeElement.setCustomValidity('');
    }
  }
}

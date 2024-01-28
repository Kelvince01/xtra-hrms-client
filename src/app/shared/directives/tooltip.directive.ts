import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'xtraTooltip',
  standalone: true,
})
export class TooltipDirective {
  @HostBinding('title') @Input() tooltip!: string;
}

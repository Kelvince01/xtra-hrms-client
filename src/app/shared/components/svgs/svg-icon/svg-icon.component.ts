import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'xtra-svg-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      version="1.1"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.fill]="fill"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <use [attr.xlink:href]="iconUrl"></use>
    </svg>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() name: string = '';
  @Input() size = 16;
  @Input() fill = 'currentColor';
  window: any = window;

  constructor() {}

  get iconUrl() {
    return `${this.window.location.href}#${this.name}`;
  }
}

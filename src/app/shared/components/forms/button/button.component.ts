import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from '@shared/components/svgs/svg-icon/svg-icon.component';

@Component({
  selector: 'xtra-button',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  template: `
    <button
      [type]="type"
      [ngClass]="[
        'btn',
        className,
        isActive ? 'is-active' : '',
        content?.innerHTML?.trim() ? '' : 'icon-only'
      ]"
      [disabled]="disabled">
      @if (!isWorking && icon) {
        <xtra-svg-icon [name]="icon" [size]="iconSize"></xtra-svg-icon>
      }
      @if (isWorking) {
        <xtra-svg-icon name="spin" class="spinner" [size]="iconSize"></xtra-svg-icon>
      }
      <span #content [class.with-padding]="isWorking || icon">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() className = 'btn-primary';
  @Input() icon: string = '';
  @Input() iconSize = 18;
  @Input() isWorking: boolean = false;
  @Input() isActive: boolean = true;
  @Input() disabled: boolean = false;
}

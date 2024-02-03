import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'xtra-avatar',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle],
  template: `
    <div *ngIf="avatarUrl" [ngClass]="['avatar-container', className]" [ngStyle]="style"></div>
  `,
  styles: [
    `
      .avatar-container {
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatarUrl: string = '';
  @Input() size = 12;
  @Input() name = '';
  @Input() rounded = true;
  @Input() className = '';

  get style() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      'background-image': `url('${this.avatarUrl}')`,
      'border-radius': this.rounded ? '100%' : '3px',
    };
  }
}

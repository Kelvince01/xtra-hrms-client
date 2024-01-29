import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {TitleComponent} from '@shared/components/title/title.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'xtra-simple-page',
  standalone: true,
  imports: [TitleComponent, MatIcon, MatButton],
  template: `
    <div id="container">
      <xtra-title
        no="{{ number }}"
        title="{{ title }}"
        subtitle="{{ subtitle }}"
        [centerText]="centerText"
      ></xtra-title>
      @if (icon) {
        <div id="icon-container">
          <mat-icon color="primary" class="icon">{{ icon }}</mat-icon>
        </div>
      }
      <button mat-flat-button color="primary" (click)="buttonClicked()" [disabled]="buttonDisabled">
        {{ buttonText }}
      </button>
    </div>
  `,
  styles: `
      .icon {
        transform: scale(7);
      }

      #icon-container {
        height: 16em;
        width: 16em;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePageComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() number?: string;
  @Input() icon?: string;
  @Input() buttonText: string = '';
  @Input() centerText?: boolean = false;
  @Input() buttonDisabled?: boolean = false;
  @Input() route?: string | undefined;
  @Output() buttonEvent = new EventEmitter();

  constructor(private router: Router) {}

  buttonClicked() {
    if (this.route) {
      this.router.navigateByUrl(this.route);
    } else {
      this.buttonEvent.emit();
    }
  }
}

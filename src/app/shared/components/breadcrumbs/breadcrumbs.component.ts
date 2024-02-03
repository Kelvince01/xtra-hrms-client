import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'xtra-breadcrumbs',
  standalone: true,
  imports: [NgForOf, NgIf],
  template: `
    <div class="text-textMedium text-15">
      <span *ngFor="let item of items; let idx = index">
        <span class="relative mx-2 font-lg" *ngIf="idx !== 0">/</span>
        {{ item }}
      </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'xtra-breadcrumbs',
  standalone: true,
  imports: [],
  template: `
    <div class="text-textMedium text-15">
      @for (item of items; track item; let idx = $index) {
        <span>
          @if (idx !== 0) {
            <span class="relative mx-2 font-lg">/</span>
          }
          {{ item }}
        </span>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
}

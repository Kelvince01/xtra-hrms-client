import { NgClass } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cdt-pager',
  template: `
    <ul class="pagination">
      @for (pageNumber of totalPages; track pageNumber) {
        <li
          data-e2e-id="pagination-item"
          class="page-item"
          [ngClass]="{ active: pageNumber === currentPage }"
          (click)="setPage.emit(pageNumber)"
        >
          <a data-e2e-id="pagination-link" class="page-link">{{ pageNumber }}</a>
        </li>
      }
    </ul>
  `,
  styles: [`
    .page-link {
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class PagerComponent {
  @Input() currentPage: number | undefined | null;
  @Input() totalPages: number[] | undefined | null;
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}

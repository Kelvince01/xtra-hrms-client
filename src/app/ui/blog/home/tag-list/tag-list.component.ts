import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'xtra-tag-list',
  standalone: true,
  imports: [],
  template: `
    <p>Popular Tags</p>

    <div class="tag-list">
      @for (tag of tags; track tag) {
        <a (click)="setListTag.emit(tag)" class="tag-pill tag-default">{{ tag }}</a>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  @Input() tags!: string[];
  @Output() setListTag: EventEmitter<string> = new EventEmitter();
}

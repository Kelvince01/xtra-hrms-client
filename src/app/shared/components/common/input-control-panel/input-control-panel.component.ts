import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {ControlPanel} from '@shared/directives/inline-input-controls.directive';

@Component({
  selector: 'xtra-input-control-panel',
  standalone: true,
  imports: [],
  template: `
    <ng-template>
      <div (click)="closed.emit()" class="input-control-panel-container">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .input-control-panel-container {
        @apply flex flex-row gap-2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlPanelComponent implements ControlPanel {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();

  constructor() {}
}

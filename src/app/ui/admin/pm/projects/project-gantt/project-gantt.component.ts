import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xtra-project-gantt',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>project-gantt works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectGanttComponent {}

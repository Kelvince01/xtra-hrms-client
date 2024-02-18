import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-project-gantt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>project-gantt works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGanttComponent {}

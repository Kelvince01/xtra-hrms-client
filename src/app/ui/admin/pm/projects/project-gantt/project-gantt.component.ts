import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-project-gantt',
  standalone: true,
  imports: [],
  template: `
    <p>project-gantt works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGanttComponent {}

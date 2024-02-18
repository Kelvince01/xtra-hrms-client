import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'xtra-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>task-list works!</p>
  `,
  styles: ``,
})
export class TaskListComponent {}

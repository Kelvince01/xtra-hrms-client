import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'xtra-question-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>question-list works!</p>
  `,
  styles: ``,
})
export class QuestionListComponent {}

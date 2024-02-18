import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'xtra-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>comment-list works!</p>
  `,
  styles: ``,
})
export class CommentListComponent {}

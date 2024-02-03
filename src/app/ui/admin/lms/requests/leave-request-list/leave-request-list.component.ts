import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xtra-leave-request-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>leave-request-list works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveRequestListComponent {}

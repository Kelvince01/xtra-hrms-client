import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xtra-leaves',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet />`,
  styles: [``]
})
export class LeavesComponent {}

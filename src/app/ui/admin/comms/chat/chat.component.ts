import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xtra-chat',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet> </router-outlet> `,
  styles: []
})
export default class ChatComponent {}
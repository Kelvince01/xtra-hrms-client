import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xtra-sms',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <router-outlet /> `,
  styles: []
})
export default class SmsComponent {}
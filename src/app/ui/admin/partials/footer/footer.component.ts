import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'xtra-footer',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <footer>
      <div class="container">
        <a routerLink="/" class="logo-font">Xtra HRMS (Client)</a>
        <span class="attribution">
          {{ date | date: 'yyyy' }}, Created with ♥ by
          <a href="https://twitter.com/Kelvince_">Kelvince Phillips</a>
          . Code &amp; design licensed under Private License.
        </span>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        position: relative;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  date: Date = new Date();
}

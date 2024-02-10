import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ExternalLinkDirective} from '@shared/directives/external-link.directive';

@Component({
  selector: 'xtra-footer',
  standalone: true,
  imports: [RouterLink, DatePipe, ExternalLinkDirective],
  template: `
    <footer>
      <div class="container">
        <a routerLink="/" class="logo-font" noBlank>Xtra HRMS</a>
        <span class="attribution">
          &copy;{{ date | date: 'yyyy' }}, Created with ♥ by
          <a href="https://twitter.com/Kelvince_">Kelvince Phillips</a>
          . Code &amp; design licensed under Private License.
        </span>
        <!--
 <p class="text-center text-gray-500 text-xs mt-2">
          &copy;{{ provideFullYear }} Xtra Blog. All rights reserved.
        </p>
-->
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

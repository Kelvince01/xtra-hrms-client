import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <div class="container">
        <a href="/" class="logo-font">Xtra HRMS (Client)</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://xtra-hrm.web.app">Xtra HRMS (Client)</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}

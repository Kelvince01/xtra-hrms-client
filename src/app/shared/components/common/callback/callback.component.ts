import {ChangeDetectionStrategy, Component} from '@angular/core';
// import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'xtra-callback',
  standalone: true,
  imports: [],
  template: `
    <p>Setting up everything...</p>
  `,
  styles: ``,
  // providers: [OidcSecurityService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallbackComponent {
  // THIS IS JUST A PLACEHOLDER TO HAVE A REDIRECT FROM THE IDP
}

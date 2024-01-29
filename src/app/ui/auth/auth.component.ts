import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'xtra-auth',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="full-screen">
      <div class="auth-container">
        <router-outlet />
      </div>
    </div>
  `,
  styles: `
      .full-screen {
        width: 100%;
        height: 100%;
        background-color: #f0f2f5;
      }

      .auth-container {
      }

      .auth-container2 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}

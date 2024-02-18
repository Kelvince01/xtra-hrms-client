import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@data/services';

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
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Xtra HRMS' + ' - Authentication');
    // if (this.authService.isAuthenticated()) {
    //   await this.router.navigate(['/']);
    // }
  }
}

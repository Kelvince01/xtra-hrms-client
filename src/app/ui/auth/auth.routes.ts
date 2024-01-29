import {Routes} from '@angular/router';
import {environment} from '../../../environments/environment.development';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in-v2.component').then((c) => c.SignInComponent),
    data: {
      seo: {
        title: 'Xtra HRMS | Sign In',
        metaTags: [
          {
            name: 'description',
            content: 'Xtra HRMS Login',
          },
          {property: 'og:title', content: 'Login'},
          {
            proprety: 'og:description',
            content: 'Xtra HRMS Login',
          },
          {
            property: 'og:image',
            content: environment.BASE_API_URL + 'assets/images/company-logo.png',
          },
          {
            property: 'og:url',
            content: environment.BASE_API_URL + 'accounts/sign-in',
          },
          {name: 'twitter:card', content: 'summary_large_image'},
        ],
      },
    },
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component').then((c) => c.SignUpComponent),
    data: {
      seo: {
        title: 'Xtra HRMS | Sign Up',
        metaTags: [
          {
            name: 'description',
            content: 'Xtra HRMS Sign Up',
          },
          {property: 'og:title', content: 'Sign Up'},
          {
            property: 'og:description',
            content: 'Xtra HRMS Sign Up',
          },
          {
            property: 'og:image',
            content: environment.BASE_API_URL + 'assets/images/company-logo.png',
          },
          {
            property: 'og:url',
            content: environment.BASE_API_URL + 'accounts/sign-up',
          },
          {name: 'twitter:card', content: 'summary_large_image'},
        ],
      },
    },
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),
    data: {
      seo: {
        title: 'Xtra HRMS | Forgot Password',
        metaTags: [
          {
            name: 'description',
            content: 'Xtra HRMS Forgot Password',
          },
          {property: 'og:title', content: 'Forgot Password'},
          {
            property: 'og:description',
            content: 'Xtra HRMS Forgot Password',
          },
          {
            property: 'og:image',
            content: environment.BASE_API_URL + 'assets/images/company-logo.png',
          },
          {
            property: 'og:url',
            content: environment.BASE_API_URL + 'accounts/forgot-password',
          },
          {name: 'twitter:card', content: 'summary_large_image'},
        ],
      },
    },
  },
  {
    path: 'reset-password/:code',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then((c) => c.ResetPasswordComponent),
    data: {
      seo: {
        title: 'Xtra HRMS | Reset Password',
        metaTags: [
          {
            name: 'description',
            content: 'Xtra HRMS Reset Password',
          },
          {property: 'og:title', content: 'Reset Password'},
          {
            property: 'og:description',
            content: 'Xtra HRMS Reset Password',
          },
          {
            property: 'og:image',
            content: environment.BASE_API_URL + 'assets/images/company-logo.png',
          },
          {
            property: 'og:url',
            content: environment.BASE_API_URL + 'accounts/reset-password',
          },
          {name: 'twitter:card', content: 'summary_large_image'},
        ],
      },
    },
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./verify-otp/verify-otp.component').then((c) => c.VerifyOtpComponent),
    data: {
      seo: {
        title: 'Xtra HRMS | Verify Otp',
        metaTags: [
          {
            name: 'description',
            content: 'Xtra HRMS Verify Otp',
          },
          {property: 'og:title', content: 'Verify Otp'},
          {
            property: 'og:description',
            content: 'Xtra HRMS Verify Otp',
          },
          {
            property: 'og:image',
            content: environment.BASE_API_URL + 'assets/images/company-logo.png',
          },
          {
            property: 'og:url',
            content: environment.BASE_API_URL + 'accounts/verify-otp',
          },
          {name: 'twitter:card', content: 'summary_large_image'},
        ],
      },
    },
  },
  {path: '**', redirectTo: '/accounts/sign-in'},
];

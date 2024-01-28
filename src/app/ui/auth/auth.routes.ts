import {Routes} from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in-v2.component').then((c) => c.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),
  },
  {
    path: 'reset-password/:code',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then((c) => c.ResetPasswordComponent),
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./verify-otp/verify-otp.component').then((c) => c.VerifyOtpComponent),
  },
  {path: '**', redirectTo: '/accounts/sign-in'},
];

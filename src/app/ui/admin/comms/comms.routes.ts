import {Routes} from '@angular/router';

export const COMMUNICATION_ROUTES: Routes = [
  {
    path: 'email-settings',
    loadComponent: () =>
      import('./email-settings/list/list.component').then((c) => c.ListComponent),
    // loadComponent: () => import('./email-settings/email-settings.component').then(c => c.EmailSettingsComponent)
  },
  {
    path: 'emails',
    loadComponent: () => import('./emails/emails.component'),
    loadChildren: () => import('./emails/emails.routes'),
  },
  {
    path: 'sms',
    loadComponent: () => import('./sms/sms.component'),
    loadChildren: () => import('./sms/sms.routes'),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component'),
    loadChildren: () => import('./chat/chat.routes').then((r) => r.CHAT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'emails',
    pathMatch: 'full',
  },
];

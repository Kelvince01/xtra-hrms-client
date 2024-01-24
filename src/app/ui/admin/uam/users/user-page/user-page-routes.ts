import {Routes} from "@angular/router";

export const userPageRoutes: Routes = [
  // { path: 'contact', loadComponent: () => import('./user-contact-details.component').then(c => c.ContactDetailsComponent) },
  { path: '', loadComponent: () => import('./user-contact-details.component').then(c => c.ContactDetailsComponent) },
  { path: 'account', loadComponent: () => import('./user-account.component').then(c => c.AccountComponent) }
];

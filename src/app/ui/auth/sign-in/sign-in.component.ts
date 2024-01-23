import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthFacade} from "../../../data/store/auth/auth.facade";
import {NgIf} from "@angular/common";

@Component({
  selector: 'xtra-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        Username:
        <input type="text" [(ngModel)]="authFacade.email" name="email" required>
      </label>
      <br>
      <label>
        Password:
        <input type="password" [(ngModel)]="authFacade.password" name="password" required>
      </label>
      <br>
      <button type="submit" [disabled]="authFacade.isLoading">Login</button>
    </form>
    <div *ngIf="authFacade.error">{{ authFacade.error }}</div>
    <div *ngIf="authFacade.token">Welcome, {{ authFacade.email }}! Your token is {{ authFacade.token }}</div>
  `,
  styles: ``,
  providers: [AuthFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  authFacade = inject(AuthFacade)

  onSubmit() {
    this.authFacade.logIn();
  }
}

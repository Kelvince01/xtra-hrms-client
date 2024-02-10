import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NavigationService} from '@shared/services/navigation.service';
import {IUser} from '@data/models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AuthService, UsersService} from '@data/services';
import {tap} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {SelectUsersDirective} from '@admin-ui/uam/users/directives/select-users.directive';

@Component({
  selector: 'xtra-ep-drawer',
  template: `
    <header>
      <mat-toolbar color="primary">
        <span>Directives in Practice</span>
        <mat-select users [formControl]="userFormControl" placeholder="Select user"></mat-select>
      </mat-toolbar>
    </header>
    <main>
      <mat-drawer-container>
        <mat-drawer mode="side" opened>
          <a *ngFor="let page of pages$ | async" color="primary" mat-button [routerLink]="page.url">
            <span>{{ page.label }}</span>
          </a>
        </mat-drawer>

        <div class="dip-layout-content">
          <router-outlet></router-outlet>
        </div>
      </mat-drawer-container>
    </main>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }

      header {
        mat-toolbar {
          .mat-mdc-button-persistent-ripple {
            border-radius: 0.25rem;
          }
          justify-content: space-between;
        }
      }

      main {
        display: flex;
        flex-direction: column;
        flex: 1;

        :host {
          display: block;
          height: calc(100vh - 4rem);
        }

        mat-drawer-container {
          height: 100%;

          mat-drawer {
            width: max(25%, 18rem);
            z-index: 1;

            a {
              display: flex;
              padding: 0.25rem 0.5rem;
              align-items: center;
              justify-content: flex-start;
              text-decoration: none;
              gap: 0.25rem;
              line-height: 1.6rem;

              mat-icon {
                margin-right: 0.5rem;
              }
            }
          }
        }

        mat-drawer-container {
          height: 100%;

          mat-drawer {
            width: max(25%, 18rem);
            z-index: 1;

            a {
              display: flex;
              padding: 0.25rem 0.5rem;
              align-items: center;
              justify-content: flex-start;
              text-decoration: none;
              gap: 0.25rem;
              line-height: 1.6rem;

              mat-icon {
                margin-right: 0.5rem;
              }
            }
          }
        }
      }

      .dip-layout-content {
        padding: 3rem;
      }

      mat-select {
        width: 200px !important;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    MatSelect,
    SelectUsersDirective,
  ],
})
export class EpDrawerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly navigationService = inject(NavigationService);
  private readonly userService = inject(UsersService);
  private readonly authService = inject(AuthService);

  userFormControl = new FormControl<IUser | null>(null);

  pages$ = this.navigationService.pages$;

  ngOnInit(): void {
    this.authService
      .user()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentUser) => {
        this.userFormControl.patchValue(currentUser);
      });

    this.userFormControl.valueChanges
      .pipe(
        tap((user) => this.userService.setCurrentUser(user!)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}

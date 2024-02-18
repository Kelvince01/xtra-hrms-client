import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IPermission } from '@models/accounts.model';
import { PermissionsService } from '@services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xtra-permission-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    MatDialogClose,
    FormsModule,
    MatInputModule,
  ],
  template: `
    <div class="header">
      <h2 mat-dialog-title>Add Permission</h2>
      <button mat-icon-button [mat-dialog-close]="false">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div mat-dialog-content>
      <form #form="ngForm" class="flex-column">
        <mat-form-field appearance="outline" class="my-2">
          <mat-label>Name</mat-label>
          <input
            type="text"
            name="name"
            id="name"
            required
            [(ngModel)]="permission.name"
            matInput />
          <mat-error>Name is Required!</mat-error>
          <mat-hint>Action to performed plus model name</mat-hint>
        </mat-form-field>

        <mat-form-field appearance="outline" class="mb-2">
          <mat-label>Namespace</mat-label>
          <input
            type="text"
            name="namespace"
            id="namespace"
            required
            [(ngModel)]="permission.namespace"
            matInput />
          <mat-error>Namespace is Required!</mat-error>
          <mat-hint>Plural model name</mat-hint>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions [align]="'end'">
      <button mat-raised-button [mat-dialog-close]="false">Cancel</button>
      <button
        id="save"
        type="submit"
        mat-flat-button
        color="primary"
        class="pull-xs-right flex-auto w-64"
        [disabled]="!form.valid || isLoading()"
        [class.spinner]="isLoading()"
        (click)="onSubmit()">
        SAVE
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        margin: 1rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      form {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  providers: [PermissionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionPageComponent {
  permission: IPermission = { name: '', namespace: '' };
  service = inject(PermissionsService);
  toastr = inject(ToastrService);
  isLoading = signal(false);

  onSubmit() {
    this.isLoading.set(true);

    this.service.create(this.permission).subscribe(
      () => {
        this.isLoading.set(false);
        this.toastr.success(`Permission Created Successfully`);
      },
      err => {
        this.isLoading.set(false);
        this.toastr.error(`Error creating permission: ${err}`);
      },
    );
  }
}

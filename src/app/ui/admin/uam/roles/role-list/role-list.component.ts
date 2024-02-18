import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { RolesService } from '@data/services/users.service';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { IUser } from '@data/models';
import { AuthService } from '@data/services';
import { IRole } from '@models/accounts.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xtra-role-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      Roles ({{ roles.length }})
      <button mat-icon-button routerLink="/uam/roles/add">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <div class="mat-elevation-z8">
      <div class="action-buttons">
        <div class="mb-0">
          <button (click)="exportData()" mat-stroked-button color="primary" class="p-3 ml-3 mt-3">
            <mat-icon>cloud</mat-icon>
            Export Data
          </button>
        </div>
      </div>

      <div class="filter-data">
        <fieldset class="scheduler-border">
          <legend class="scheduler-border"><small>Filter</small></legend>
          <form novalidate (ngSubmit)="filterRoles()">
            <mat-form-field id="category-filter">
              <mat-label>Filter by client</mat-label>
              <mat-select [(ngModel)]="searchData.client_id" name="client_id">
                <mat-option [value]="null">None</mat-option>
                @for (client of clients; track client) {
                  <mat-option [value]="client.id">
                    {{ client.name }}
                  </mat-option>
                }
              </mat-select>
            </mat-form-field>
            <button style="margin-left: 1.5em;" mat-stroked-button color="primary">Filter</button>
            <button
              type="button"
              style="margin-left: 1.5em;"
              (click)="resetData()"
              mat-stroked-button
              color="accent">
              Reset
            </button>
          </form>
        </fieldset>
      </div>

      <table mat-table [dataSource]="roles">
        <!--id column-->
        <ng-container [sticky]="true" matColumnDef="no">
          <th mat-header-cell *matHeaderCellDef>No</th>
          <td mat-cell *matCellDef="let element; let i = index">{{ i + 1 }}</td>
        </ng-container>

        <!--role column-->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Role</th>
          <td mat-cell *matCellDef="let element">
            {{ element.name }}
            <!--            ({{
              element['auction_client.name'] ? element['auction_client.name'] : 'N/A'
            }})-->
          </td>
        </ng-container>

        <!--role column-->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">
            {{ element.description ? element.description : '----' }}
          </td>
        </ng-container>

        <!--Status column-->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">
            {{ element.revoked ? 'Revoked' : 'Valid' }}
          </td>
        </ng-container>

        <!--Created by column-->
        <ng-container matColumnDef="created_by">
          <th mat-header-cell *matHeaderCellDef>Created by</th>
          <td mat-cell *matCellDef="let element">
            <a (click)="viewUser(element.created_by)" routerLink="." title="view">
              <mat-icon>visibility</mat-icon>
            </a>
          </td>
        </ng-container>

        <!-- Updated by Column -->
        <ng-container matColumnDef="updated_by">
          <th mat-header-cell *matHeaderCellDef>Updated By</th>
          <td mat-cell *matCellDef="let element">
            <a (click)="viewUser(element.updated_by)" routerLink="." title="view">
              <mat-icon>visibility</mat-icon>
            </a>
          </td>
        </ng-container>

        <!--actions column-->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Delete</th>
          <td mat-cell *matCellDef="let element">
            <button (click)="deleteRole(element.id)" mat-stroked-button>
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="assign">
          <th mat-header-cell *matHeaderCellDef>Revoke/Restore</th>
          <td mat-cell *matCellDef="let element">
            @if (!element.revoked) {
              <button (click)="revokeRole(element.id)" mat-stroked-button>
                <mat-icon>lock</mat-icon>
              </button>
            }
            @if (element.revoked) {
              <button (click)="restoreRole(element.id)" mat-stroked-button>
                <mat-icon>refresh</mat-icon>
              </button>
            }
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
      </table>
      @if (simulateTable) {
        <div class="spinner">
          <mat-spinner [strokeWidth]="2" [diameter]="30"></mat-spinner>
        </div>
      }
      <mat-paginator
        #paginator
        [pageSize]="10"
        [length]="tableLength"
        [pageSizeOptions]="[5, 10, 20]"
        [showFirstLastButtons]="true"></mat-paginator>
    </div>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
      mat-form-field {
        width: 52%;
      }
      div.spinner {
        width: 30%;
        margin: auto;
        padding: 0.2em;
      }
      .filter-data {
        padding: 1rem;
      }
    `,
  ],
  providers: [RolesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('matSelect', { static: true }) selection!: MatSelect;

  searchData = {
    client_id: null,
  };
  displayColumns: string[] = [
    'no',
    'name',
    'description',
    'status',
    'created_by',
    'updated_by',
    'actions',
    'assign',
  ];
  tableLength: number = 0;
  simulateTable: boolean = true;
  currentUser!: IUser;
  roles!: Array<IRole>;
  isHost: boolean = false;
  clients: any[] = [];
  level: boolean = false;
  dropdownRoles: any[] = [];

  roleService = inject(RolesService);
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  toastr = inject(ToastrService);
  // userService = inject(UsersService);

  ngOnInit(): void {
    // this.currentUser = this.authService.user(); // current authenticated user
    // this.isHost = this.uamCommon.isHost(this.currentUser);
    this.getRoles();
    // be minimalistic call clients only if user is not a client
    // this.isHost ? this.getClients() : null;
    this.getUserIndivualRoles(Number(this.currentUser.id));
  }

  getRoles(query?: any): void {
    this.roleService.getPaginated().subscribe(_ => {
      this.roles = _.results;
    });
    /*merge(this.paginator.page)
      .pipe(
        takeUntilDestroyed(),
        startWith({}),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        switchMap(_ => {
          this.simulateTable = true;
          const _query = { pageIndex: this.paginator.pageIndex, query };
          return this.roleService
            .getAllPaginated
            //_query
            ();
        })*/
    /*map((response: Paginated<any>) => {
          this.tableLength = response.total;
          this.simulateTable = false;
          return <IRole[]>response.results;
        })*/
    // catchError(_=>)
    /*)
      .subscribe({
        next: response => {
          // this.roles = response;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: error => {
          this.simulateTable = false;
        }
      });*/
  }

  deleteRole(roleId: number): void {
    this.roleService.delete(roleId);
  }

  filterRoles(): void {
    this.getRoles(this.searchData);
  }

  resetData(): void {
    this.searchData.client_id = null; //
    this.getRoles();
  }

  revokeRole(roleId: number): void {
    const isOk = confirm('Are you sure?');
    if (!isOk) return;
    const revokeData: Partial<IRole> = {
      revoked: true,
    };
    if (!roleId) {
      return;
    }
    this.roleService.update(revokeData as any);
  }

  restoreRole(roleId: number): void {
    const isOk = confirm('Are you sure?');
    if (!isOk) return;
    const revokeData = {
      revoked: false,
    };
    if (!roleId) {
      return;
    }
    this.roleService.update(revokeData as any);
  }

  //navigates to add role
  addNew(): void {}

  exportData(): void {
    this.toastr.info('Not implemented!!');
  }

  viewUser(userId: number): void {
    if (!userId) {
      return;
    }
    /*this.userService.getById(userId).subscribe(response => {
      if (response) {
        const { username, email, phone_no } = response;
        const user = `${username}(${email})`;
        this.snackbar.open(user, phone_no, {
          duration: 10000
        });
      }
    });*/
  }

  //get auth user roles
  getUserIndivualRoles(userId: number): void {
    if (!userId) {
      return;
    }
    /*this.roleService
      .getAllPaginated({
        // user_id: userId
      })
      .subscribe(response => {
        const userRole = response.results.reduce((prev, acc) => {
          prev = acc['role.user_category'];
          if (acc['role.user_category'] < prev) {
            prev = acc['role.user_category'];
          }
          return prev;
        }, null);
        if (typeof userRole !== 'number') {
          return;
        }
        this.getDropDownRoles(userRole);
      });*/
  }

  // get user roles used for drop down data
  getDropDownRoles(userRoleCategory: number): void {
    if (userRoleCategory) {
      return;
    }
    let clientQuery: any;
    if (!this.isHost) {
      clientQuery.client_id = this.currentUser.client_id;
    }
    /*this.roleService
      .getAllPaginated({
        user_category: { $gt: userRoleCategory },
        ...clientQuery
      })
      .subscribe(response => {
        this.dropdownRoles = response.results;
      });*/
  }
}

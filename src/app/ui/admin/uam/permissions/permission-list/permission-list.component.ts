import {ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {RouterLink} from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IPermission, IRole} from '@data/models/accounts.model';
import {MatDialog} from '@angular/material/dialog';
import {PermissionsService, RolesService} from '@data/services/users.service';
import {PermissionPageComponent} from '../permission-page/permission-page.component';

@Component({
  selector: 'xtra-permission-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    RouterLink,
    MatPaginatorModule,
  ],
  template: `
    <h3>Permissions</h3>
    <div class="mat-elevation z8">
      <div class="action-buttons">
        <div>
          <button (click)="addNew()" mat-stroked-button color="primary">
            <mat-icon>add</mat-icon>
            New Permission
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <div class="filter-data">
          <!--  -->
          <fieldset class="scheduler-border">
            <legend class="scheduler-border"><small>Filter</small></legend>
            <form novalidate (ngSubmit)="searchRolePerms()">
              <mat-form-field id="role-filter">
                <mat-label>Filter by role</mat-label>
                <mat-select [(ngModel)]="searchData.role_id" name="role_id">
                  @for (role of roles; track role.id) {
                    <mat-option [value]="role.id">
                      {{ role.name }}
                    </mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <button style="margin-left: 1.5em" mat-stroked-button color="primary">Filter</button>
              <button
                type="button"
                style="margin-left: 1.5em"
                (click)="resetData()"
                mat-stroked-button
                color="accent"
              >
                Reset
              </button>
            </form>
          </fieldset>
        </div>
        <table mat-table matSort [dataSource]="allPermissions">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Action Name</th>
            <td mat-cell *matCellDef="let element">
              {{ element['name'] }}
            </td>
          </ng-container>
          <!--Action column
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Action Name</th>
            <td mat-cell *matCellDef="let element">
              {{ element['action.name'] }}
            </td>
          </ng-container>
          -->

          <!--Role column
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
            <td mat-cell *matCellDef="let element">
              {{ element['role.role'] }}
            </td>
          </ng-container>
          -->

          <!--Date created column-->
          <ng-container matColumnDef="created_at">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date Created</th>
            <td mat-cell *matCellDef="let element">
              {{ element.created_at | date: 'short' }}
            </td>
          </ng-container>

          <!--Date updated column-->
          <ng-container matColumnDef="updated_at">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date Updated</th>
            <td mat-cell *matCellDef="let element">
              {{ element.updated_at | date: 'short' }}
            </td>
          </ng-container>

          <!--Created By column-->
          <ng-container matColumnDef="created_by">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Created By</th>
            <td mat-cell *matCellDef="let element">
              <a (click)="viewUser(element.created_by)" routerLink="." title="view">
                <mat-icon>visibility</mat-icon>
              </a>
            </td>
          </ng-container>

          <!--Updated By column-->
          <ng-container matColumnDef="updated_by">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Updated By</th>
            <td mat-cell *matCellDef="let element">
              <a (click)="viewUser(element.updated_by)" routerLink="." title="view">
                <mat-icon>visibility</mat-icon>
              </a>
            </td>
          </ng-container>

          <!--actions-->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Actions</th>
            <td mat-cell *matCellDef="let element">
              <a
                (click)="deletePermission(element.id)"
                mat-stroked-button
                color="accent"
                title="delete"
              >
                <mat-icon>delete</mat-icon>
              </a>
            </td>
          </ng-container>
          <tr mat-header-row class="mat-header" *matHeaderRowDef="tableColumns"></tr>
          <tr class="mat-row" mat-row *matRowDef="let row; columns: tableColumns"></tr>
        </table>
        @if (!allPermissions.data.length) {
          <div class="alert alert-info text-center">
            <p>No data</p>
          </div>
        }
        <mat-paginator
          #paginator
          [length]="totalPermissions"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25, 100]"
        ></mat-paginator>
      </div>
    </div>
  `,
  styles: ``,
  providers: [PermissionsService, RolesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  tableColumns: string[] = [
    // 'action',
    // 'role',
    'name',
    'created_at',
    'updated_at',
    'created_by',
    'updated_by',
    'actions',
  ];
  // allPermissions: MatTableDataSource<IPermission>;
  allPermissions: MatTableDataSource<any> = new MatTableDataSource<any>();
  totalPermissions: number = 0;
  searchData = {
    role_id: null,
  };
  actions: any[] = [];
  roles: IRole[] = [];
  permissions: IPermission[] = [];
  isHost: boolean = false;

  // authService = inject(AuthService);
  permissionsService = inject(PermissionsService);
  rolesService = inject(RolesService);
  // usersService = inject(UsersService);
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  /*constructor(private uam: UserActionManagementService, private snackbar: MatSnackBar,
              private alert: AlertService, private dataService: DataService,
              private uamCommon: UamCommonService) { }*/

  ngOnInit(): void {
    //current user
    // const currentUser = this.authService.user();
    // eslint-disable-next-line no-console
    // console.log(currentUser);
    // this.isHost = this.uamCommon.isHost(currentUser);
    // this.isHost = true;
    /*this.isHost
      ? (this.getAllPermissions(), this.getRoles({ revoked: false }))
      : this.getClientRoles({
          client_id: currentUser.client_id,
          revoked: false
        });*/
    this.getAllPermissions();
    this.getRoles();
  }

  //get permissions
  getAllPermissions(query?: any): void {
    this.permissionsService.get(query).subscribe((_) => {
      this.allPermissions = new MatTableDataSource(_);
      // this.allPermissions.data = this.permissionsService.objects();
      this.allPermissions.paginator = this.paginator;
      this.totalPermissions = _ ? _.length : 0;
    });
  }

  getRoles(query?: any): void {
    this.rolesService.getPaginated(query).subscribe((_) => {
      this.roles = _.results;
    });
  }

  getClientRoles(query?: any): void {
    /*this.rolesService.getAll(query).subscribe(response => {
      if (response) {
        this.roles = response;
        const clientRolesId = [];
        this.roles.forEach(r => {
          clientRolesId.push(r.id);
        });

        const q = {
          role_id: clientRolesId
        };
        this.permissionsService
          .getAll
          //q
          ()
          .pipe(takeUntilDestroyed())
          .subscribe(res => {
            this.allPermissions = new MatTableDataSource(res) as any;
            this.allPermissions.paginator = this.paginator;
            this.totalPermissions = res ? res.length : 0;
          });
      }
    });*/
  }

  viewUser(userId: number): void {
    /*this.usersService.getById(userId).subscribe(response => {
      if (response) {
        const { username, email, phone_no } = response;
        const user = `${username} ${email}`;
        this.snackbar.open(user, phone_no, {
          duration: 10000
        });
      }
    });*/
  }

  //delete permission
  deletePermission(id: number): void {
    // const isOk = confirm('Are you sure?');
    // if (!isOk) return;
    this.permissionsService.delete(id);
  }

  searchRolePerms(): void {
    // this.getAllPermissions(this.searchData);
    this.getAllPermissions();
  }

  resetData(): void {
    this.searchData.role_id = null;
    this.getAllPermissions();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(PermissionPageComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
      dialogRef.close();
    });
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {IUser} from '@data/models';
import {RouterLink} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {FilesService} from '@data/services/common/files.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UsersService} from '@data/services';
import {IOptions} from '@data/models/http-param-options.model';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslateModule} from '@ngx-translate/core';
import {CopyUserDirective} from '@admin-ui/uam/users/user-list/actions/copy-user.directive';
import {DeleteUserDirective} from '@admin-ui/uam/users/user-list/actions/delete-user.directive';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {FlexModule} from '@ngbracket/ngx-layout';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'xtra-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    MatMenuTrigger,
    CopyUserDirective,
    DeleteUserDirective,
    MatChipSet,
    MatChip,
    FlexModule,
    MatSlideToggle,
    MatInput,
  ],
  template: `
    <mat-toolbar color="primary">
      <p [ngPlural]="users.length">
        <ng-template ngPluralCase="0">No users</ng-template>
        <ng-template ngPluralCase="1">One user</ng-template>
        <ng-template ngPluralCase="other">({{ users.length }}) users</ng-template>
      </p>
      <button mat-icon-button routerLink="/uam/users/add">
        <mat-icon>add_circle</mat-icon>
      </button>
      <div fxFlex fxFill class="search-col">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          (keyup)="applyFilter($event)"
          #input
          name="search"
        />
      </div>
      <div fxFlex="200px" class="export-col">
        <span class="avatar accent-1 large">
          <mat-icon class="mat-icon-size">save_alt</mat-icon>
        </span>
      </div>
    </mat-toolbar>
    <div class="mat-elevation-z8">
      @if (isLoading()) {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
      <table mat-table [dataSource]="dataSource" class="p-6 divide-y divide-slate-200">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let element" [routerLink]="['/uam/users/edit', element.id]">
            {{ element.id }}
          </td>
        </ng-container>

        <!-- Photo Column -->
        <ng-container matColumnDef="photo">
          <th mat-header-cell *matHeaderCellDef>Photo</th>
          <td mat-cell *matCellDef="let element">
            <a
              [routerLink]="['/uam/users/edit', element.id]"
              [state]="element"
              class="flex py-4 first:pt-0 last:pb-0"
            >
              <img
                [ngSrc]="element.photo"
                [height]="25"
                [width]="25"
                alt="Avatar of user"
                class="h-10 w-10 rounded-full"
              />
              <div class="ml-3 overflow-hidden">
                <p class="text-sm font-medium text-slate-900">{{ element.username }}</p>
                <p class="text-sm text-slate-500 truncate">{{ element.email }}</p>
              </div>
            </a>
          </td>
        </ng-container>

        <ng-container matColumnDef="is_verified">
          <th mat-header-cell *matHeaderCellDef>Verified?</th>
          <td mat-cell *matCellDef="let element">
            @if (element.is_verified) {
              <mat-chip color="primary">
                {{ element.is_verified }}
              </mat-chip>
            } @else {
              <mat-chip color="warn">
                {{ element.is_verified }}
              </mat-chip>
            }
          </td>
        </ng-container>

        <ng-container matColumnDef="phone_no">
          <th mat-header-cell *matHeaderCellDef>Phone</th>
          <td mat-cell *matCellDef="let element">{{ element.phone_no }}</td>
        </ng-container>

        <ng-container matColumnDef="roles">
          <th mat-header-cell *matHeaderCellDef>Roles</th>
          <td mat-cell *matCellDef="let element">
            <mat-chip-set aria-label="User roles">
              @for (role of element.roles; track role) {
                <mat-chip>
                  {{ role }}
                </mat-chip>
              }
            </mat-chip-set>
          </td>
        </ng-container>

        <ng-container matColumnDef="online">
          <th mat-header-cell *matHeaderCellDef>Online?</th>
          <td mat-cell *matCellDef="let element">
            @if (element.online) {
              <mat-chip color="primary">
                {{ element.online }}
              </mat-chip>
            } @else {
              <mat-chip color="warn">
                {{ element.online }}
              </mat-chip>
            }
          </td>
        </ng-container>

        <ng-container matColumnDef="created_at">
          <th mat-header-cell *matHeaderCellDef>Created Date</th>
          <td mat-cell *matCellDef="let element">{{ element.created_at | date: 'medium' }}</td>
        </ng-container>

        <ng-container matColumnDef="last_seen">
          <th mat-header-cell *matHeaderCellDef>Last Seen</th>
          <td mat-cell *matCellDef="let element">{{ element.last_seen | date: 'medium' }}</td>
        </ng-container>

        <ng-container matColumnDef="menu">
          <th mat-header-cell *matHeaderCellDef>{{ 'common.caption.actions' | translate }}</th>
          <td
            mat-cell
            *matCellDef="let element"
            [attr.data-label]="'common.caption.actions' | translate"
          >
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item [routerLink]="['/uam/users/edit', element.id]">
                <mat-icon>edit</mat-icon>
                <span>{{ 'common.menu.edit' | translate }}</span>
              </button>
              <button mat-menu-item (click)="delete(element)" color="warn">
                <mat-icon>delete</mat-icon>
                <span>{{ 'common.menu.remove' | translate }}</span>
              </button>
              <button
                mat-menu-item
                *hasRole="[]"
                xtraDeleteUser
                [user]="element"
                [activeFor]="[]"
                message="Deletion is irreversible"
              >
                <mat-icon>delete_forever</mat-icon>
                <span>Delete</span>
              </button>
              <!-- DEMO: remove activeFor -->
              <button mat-menu-item xtraCopyUser [user]="element" [activeFor]="[]">
                <mat-icon>file_copy</mat-icon>
                <span>Copy</span>
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        #paginator
        [length]="totalRows"
        [pageIndex]="currentPage"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (page)="pageChanged($event)"
        aria-label="Select page"
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      $search-bar-bg: #6097f6;
      $search-bar-color: #fff;

      .search-col {
        line-height: 62px;
        text-align: center;
      }

      .search-bar {
        background: $search-bar-bg;
        border-radius: 2px;
        min-width: 144px;
        outline: none;
        color: $search-bar-color;
        border: none;
        height: 38px;
        line-height: 38px;
        width: 100%;
        padding: 0 30px;
        font-weight: 100;
        font-size: 80%;
        max-width: 550px;
        margin: 0 auto;

        &::placeholder {
          color: $search-bar-color;
        }

        &::before {
          box-shadow: inset -24px 0 12px -12px #898984;
          transition: box-shadow 0.15s;
        }
      }

      .export-col {
        text-align: right;
      }
    `,
  ],
  providers: [UsersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements AfterViewInit, OnInit {
  users: IUser[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = signal(false);

  displayedColumns: string[] = [
    'id',
    'photo',
    'is_verified',
    'phone_no',
    'roles',
    'online',
    'created_at',
    'last_seen',
    'menu',
  ];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  service = inject(UsersService);
  filesService = inject(FilesService);
  readonly #toastr = inject(ToastrService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const query: IOptions = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    };
    this.isLoading.set(true);

    this.service.getPaginated().subscribe((r) => {
      this.isLoading.set(false);
      this.dataSource.data = r.results;
      this.users = r.results;

      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = r.total;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(user: IUser) {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.value) {
          this.service.delete(user.id!).subscribe({
            next: () => {
              this.#toastr.success('User deleted successfully', 'Success');
              Swal.fire('Removed!', 'User removed successfully.', 'success');
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'User not deleted.)', 'error');
        }
      });
    } catch (error: any) {
      console.error(`Error deleting user`, error.error);
      this.#toastr.error(`Error when deleting user ${error.error}`, 'Failed');
    }
  }

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }
}

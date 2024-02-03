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
  ],
  template: `
    <mat-toolbar color="primary">
      Users ({{ users.length }})
      <button mat-icon-button routerLink="/uam/users/add">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <div class="mat-elevation-z8">
      @if (isLoading()) {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
      <table mat-table [dataSource]="dataSource">
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
            <a [routerLink]="['/uam/users/view', element.id]" [state]="element">
              <img [ngSrc]="element.photo" [height]="25" [width]="25" alt="Avatar of user" />
            </a>
          </td>
        </ng-container>

        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef>Username</th>
          <td mat-cell *matCellDef="let element">{{ element.username }}</td>
        </ng-container>

        <ng-container matColumnDef="phone_no">
          <th mat-header-cell *matHeaderCellDef>Phone</th>
          <td mat-cell *matCellDef="let element">{{ element.phone_no }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let element">{{ element.email }}</td>
        </ng-container>

        <ng-container matColumnDef="created_at">
          <th mat-header-cell *matHeaderCellDef>Created Date</th>
          <td mat-cell *matCellDef="let element">{{ element.created_at | date: 'medium' }}</td>
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
  styles: [``],
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

  displayedColumns: string[] = ['id', 'photo', 'username', 'phone_no', 'email', 'created_at'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  service = inject(UsersService);
  filesService = inject(FilesService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const query: IOptions = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    };

    this.service.getPaginated().subscribe((r) => {
      this.dataSource.data = r.results;

      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = r.total;
    });
  }

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
}

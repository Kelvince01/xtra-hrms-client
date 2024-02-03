import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ToastrService} from 'ngx-toastr';
import {IPerformance} from '@data/models/pms.model';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RouterLink} from '@angular/router';
import {PerformancesService} from '@data/services/pms.service';

@Component({
  selector: 'xtra-performance-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatTableModule, RouterLink, MatPaginatorModule],
  template: `
    <div class="mat-elevation-z8">
      @if (isLoading()) {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
      <table mat-table [dataSource]="dataSource">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <ng-container matColumnDef="employee">
          <th mat-header-cell *matHeaderCellDef>Employee</th>
          <td mat-cell *matCellDef="let element">{{ element.employee }}</td>
        </ng-container>

        <ng-container matColumnDef="performance_rating">
          <th mat-header-cell *matHeaderCellDef>Performance Rating</th>
          <td mat-cell *matCellDef="let element">{{ element.performance_rating }}</td>
        </ng-container>

        <ng-container matColumnDef="evaluation_date">
          <th mat-header-cell *matHeaderCellDef>Evaluation Date</th>
          <td mat-cell *matCellDef="let element">{{ element.evaluation_date | date: 'medium' }}</td>
        </ng-container>

        <ng-container matColumnDef="comments">
          <th mat-header-cell *matHeaderCellDef>Comments</th>
          <td mat-cell *matCellDef="let element">{{ element.comments }}</td>
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
  styles: ``,
  providers: [PerformancesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceListComponent implements AfterViewInit, OnInit {
  performances: IPerformance[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = signal(false);

  displayedColumns: string[] = [
    'id',
    'employee',
    'performance_rating',
    'evaluation_date',
    'comments',
  ];
  dataSource: MatTableDataSource<IPerformance> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  service = inject(PerformancesService);
  toastr = inject(ToastrService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    //Load initial data
    this.loadData();
  }

  loadData(): void {
    this.service.get().subscribe((r) => {
      this.dataSource.data = r;
      this.performances = r;
    });

    setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.performances.length;
    });
  }

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
}

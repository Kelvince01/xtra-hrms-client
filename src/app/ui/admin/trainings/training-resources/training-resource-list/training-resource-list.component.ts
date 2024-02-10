import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {ITrainingResource} from '@models/training.model';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'xtra-training-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatPaginator,
  ],
  template: `
    <mat-table
      #table
      [dataSource]="dataSource"
      matSort
      #customerSort="matSort"
      matSortActive="Username"
      matSortDirection="asc"
      [matSortDisableClear]="true"
    >
      >
      <!-- Checkbox Column -->
      <ng-container matColumnDef="select">
        <mat-header-cell *matHeaderCellDef>
          <mat-checkbox
            (change)="$event ? masterToggle() : null"
            [checked]="selection.hasValue() && isAllSelected()"
            [indeterminate]="selection.hasValue() && !isAllSelected()"
          ></mat-checkbox>
        </mat-header-cell>
        <mat-cell *matCellDef="let row">
          <mat-checkbox
            (click)="$event.stopPropagation()"
            (change)="$event ? selection.toggle(row) : null"
            [checked]="selection.isSelected(row)"
          ></mat-checkbox>
        </mat-cell>
      </ng-container>
      <!-- Position Column -->
      <ng-container matColumnDef="Username">
        <mat-header-cell *matHeaderCellDef matSort>Username</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.Username }}
        </mat-cell>
      </ng-container>
      <!-- Name Column -->
      <ng-container matColumnDef="FirstName">
        <mat-header-cell *matHeaderCellDef matSort>First Name</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.FirstName }}
        </mat-cell>
      </ng-container>
      <!-- Weight Column -->
      <ng-container matColumnDef="LastName">
        <mat-header-cell *matHeaderCellDef matSort>Last Name</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.LastName }}
        </mat-cell>
      </ng-container>
      <!-- Symbol Column -->
      <ng-container matColumnDef="Email">
        <mat-header-cell *matHeaderCellDef matSort>Email</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.Email }}
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row
        *matRowDef="let row; columns: displayedColumns"
        (click)="selection.toggle(row)"
      ></mat-row>
    </mat-table>

    <mat-paginator [pageSizeOptions]="[5, 10, 20]" [showFirstLastButtons]="true"></mat-paginator>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingResourceListComponent implements OnInit, AfterViewInit {
  // Table Variables
  @ViewChild('customerSort') sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<ITrainingResource>(true, []);
  displayedColumns = ['select', 'Username', 'FirstName', 'LastName', 'Email'];
  dataSource: MatTableDataSource<ITrainingResource> = new MatTableDataSource<ITrainingResource>();

  // Data Variables
  customers$: Observable<ITrainingResource[]> = of();
  customers: ITrainingResource[] = [];
  error$: Observable<string> = of();
  loading$: Observable<boolean> = of();

  constructor(
    public dialog: MatDialog,
    // private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.loadCustomersList();
    this.subscribeToCustomers();
    this.sort.sortChange.subscribe(() => {
      console.log(this.sort.active, this.sort.direction);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  loadCustomersList() {
    // this.store.dispatch(new customerActions.LoadCustomers());
    // this.customers$ = this.store.select(fromCustomer.getCustomers);
    // this.loading$ = this.store.select(fromCustomer.isLoading);
  }

  subscribeToCustomers() {
    this.customers$.subscribe((customers) => {
      this.dataSource = new MatTableDataSource<ITrainingResource>(customers);
    });
  }
}

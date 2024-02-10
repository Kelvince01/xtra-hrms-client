/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {ITableColumn} from './table-column.model';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgMatTableQueryReflectorDirective} from '@shared/directives/ng-mat-table-query-reflector.directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DataPropertyGetterPipe} from '@shared/pipes/data-property-getter.pipe';
import {BaseService} from '@data/services';
import {IBaseModel} from '@data/models';
import {FilesService} from '@services/common';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'xtra-table',
  standalone: true,
  template: `
    <ng-container>
      <mat-toolbar>
        <mat-toolbar-row class="flex-row">
          <span class="title basis-[100px]">{{ title }}</span>
          <!--button
            class="right-2"
            *ngIf="!newButtonHidden"
            matTooltipClass="tooltip"
            matTooltipPosition="left"
            [matTooltip]="addRowText"
            mat-raised-button
            color="primary"
            style="float:right"
            (click)="emitAddNewAction()">
            <mat-icon>add</mat-icon>
            {{ 'common.new-button' | translate }}
          </button-->
        </mat-toolbar-row>
      </mat-toolbar>

      @if (isLoading) {
        <div
          style="display: flex; justify-content: center;
           align-items: center; background: white;"
        >
          <mat-progress-bar color="primary" mode="indeterminate"></mat-progress-bar>
        </div>
      }

      <!-- Table -->
      <table
        mat-table
        [dataSource]="tableDataSource"
        matSort
        (matSortChange)="sortTable($event)"
        xtraNgMatTableQueryReflector
        (scroll)="onTableScroll($event)"
        class="table-container mat-elevation-z8"
      >
        @for (tableColumn of displayTableColumns; track tableColumn) {
          <ng-container [matColumnDef]="tableColumn.name">
            <!-- if sortable column header -->
            @if (tableColumn.isSortable) {
              <th
                mat-header-cell
                *matHeaderCellDef
                [mat-sort-header]="tableColumn.name"
                [arrowPosition]="tableColumn.position === 'right' ? 'before' : 'after'"
              >
                {{ tableColumn.name }}
              </th>
            } @else {
              <th
                mat-header-cell
                *matHeaderCellDef
                [class.text-right]="tableColumn.position === 'right'"
              >
                {{ tableColumn.name }}
              </th>
            }
            <!-- else not sortable -->

            <!-- column data -->
            <td
              mat-cell
              *matCellDef="let element"
              [class.text-right]="tableColumn.position === 'right'"
            >
              {{ element | dataPropertyGetter: tableColumn.dataKey! }}
            </td>
          </ng-container>
        }

        <!-- first header row -->
        <ng-container matColumnDef="header-row-first-group">
          <th mat-header-cell *matHeaderCellDef [attr.colspan]="6">
            <div class="flex justify-between items-center">
              <div>
                <!-- Filter -->
                @if (isFilterable) {
                  <ng-container [matColumnDef]="this.rowFilterAction">
                    <mat-form-field>
                      <mat-label>Filter</mat-label>
                      <!--                    <mat-icon [ngStyle]="{'color': '#88ACC1'}">search</mat-icon>-->
                      <input
                        matInput
                        (keyup)="applyFilter($event)"
                        placeholder="filter"
                        #input
                        type="text"
                        name="search"
                      />
                    </mat-form-field>
                  </ng-container>
                }
              </div>
              <div class="space-x-2 pr-20 ">
                <button mat-button>
                  <mat-icon class="mat-icon-size">tune</mat-icon>
                </button>
                @if (!exportButtonHidden) {
                  <button
                    class="right-2 export-button"
                    mat-raised-button
                    color="primary"
                    (click)="emitExportDataAction()"
                  >
                    <mat-icon class="mat-icon-size">save_alt</mat-icon>
                    {{ 'common.export-button' | translate }}
                  </button>
                }
                <button mat-flat-button>
                  <mat-icon class="mat-icon-size">print</mat-icon>
                </button>
              </div>
            </div>
          </th>
        </ng-container>

        <!-- action column
              <ng-container *ngIf='rowActionIcon?.length' [matColumnDef]='rowActionIcon'>
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef='let element' [id]='rowActionIcon' (click)='emitRowAction(element)'>
                  <button mat-button>
                    <mat-icon>{{rowActionIcon}}</mat-icon>
                  </button>
                </td>
              </ng-container> -->

        <!-- Menu Column -->
        @if (displayedColumns().includes('menu')) {
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
                <button mat-menu-item (click)="emitEditAction(element.id)">
                  <mat-icon>edit</mat-icon>
                  <span>{{ 'common.menu.edit' | translate }}</span>
                </button>
                <button mat-menu-item (click)="emitDeleteAction(element)">
                  <mat-icon>delete</mat-icon>
                  <span>{{ 'common.menu.remove' | translate }}</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="['header-row-first-group']"></tr>
        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
      </table>

      <ng-template #success>
        <div class="flex items-center space-x-1">
          <mat-icon class="mat-icon-size" color="primary">check</mat-icon>
          <span>{{ 200 }}</span>
        </div>
      </ng-template>

      <ng-template #failed>
        <div class="flex items-center space-x-1">
          <mat-icon class="text-customGreyColor mat-icon-size">error_outline</mat-icon>
          <span>{{ 400 }}</span>
        </div>
      </ng-template>

      <!-- No Data -->
      @if (tableDataSource.data.length === 0) {
        <div>No Records Found!</div>
      }

      <!-- Pagination -->
      @if (isPageable) {
        <mat-paginator
          [pageSizeOptions]="pageSizeOptions"
          [pageSize]="defaultPageSize"
          (page)="onPageChange($event)"
          [showFirstLastButtons]="true"
          #paginator
          [length]="totalRows"
          [pageIndex]="currentPage"
          aria-label="Select page"
        ></mat-paginator>
      }
    </ng-container>
  `,
  imports: [
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    MatToolbarModule,
    TranslateModule,
    MatMenuModule,
    MatProgressBarModule,
    NgStyle,
    NgMatTableQueryReflectorDirective,
    DataPropertyGetterPipe,
    MatTooltipModule,
    DataPropertyGetterPipe,
  ],
  styles: [
    `
      table {
        width: 100%;
      }

      th,
      td {
        padding: 10px !important;
      }

      mat-form-field {
        width: 100%;
        display: block;
      }

      .text-right {
        text-align: right !important;
      }

      .title {
        margin-right: 12px;
      }

      .export-button {
        right: 0;
        margin-left: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns: WritableSignal<string[]> = signal<string[]>([]);
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;
  @Input() isLoading = true;
  @Input({required: true}) title = '';
  @Input() hasMenu = false;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([]);
  @Input({required: false}) rowFilterAction: string = 'filter';
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() defaultPageSize = this.pageSizeOptions[1];
  @Input() newButtonHidden: boolean = false;
  @Input() exportButtonHidden: boolean = false;
  @Output() sort?: EventEmitter<Sort> = new EventEmitter();
  @Output() rowEditAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDeleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() addNewAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() exportDataAction: EventEmitter<any> = new EventEmitter<any>();
  page = 1;
  per_page = 10;
  totalData: number = 0;
  totalRows = 0;
  currentPage = 0;
  protected router!: Router;
  protected route!: ActivatedRoute;

  constructor() {}

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  get columnsToDisplay(): Array<string> {
    // tslint:disable-next-line:no-non-null-assertion
    return this.displayedColumns()!.filter((x) => x !== 'menu');
  }

  get displayTableColumns(): ITableColumn[] {
    // tslint:disable-next-line:no-non-null-assertion
    return this.tableColumns()!.filter((x) => x.name !== 'menu');
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns().map((tableColumn: ITableColumn) => tableColumn.name);

    this.displayedColumns.set(columnNames);

    if (this.hasMenu) {
      this.displayedColumns().push('menu');
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
    // this.paginator.pageIndex = this.currentPage;
    // this.paginator.length = res.results.count;
  }

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      // this.tableDataSource = this.tableDataSource.concat(ELEMENT_DATA);
    }
  }

  onPageChange(event: PageEvent): void {
    // Handle page change event
    this.page = event.pageIndex + 1; // Update page based on event
    this.per_page = event.pageSize; // Update perPage based on event
    //this.loadData(this.page, this.per_page);  // Reload data with updated page and perPage
  }

  setTableDataSource(data: any): void {
    this.tableDataSource = new MatTableDataSource<any>(data);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns().find(
      (column) => column.name === sortParameters.active,
    )!.dataKey!;
    this.sort!.emit(sortParameters);
  }

  emitEditAction(row: any): void {
    this.rowEditAction.emit(row);
  }

  emitDeleteAction(row: any): void {
    this.rowDeleteAction.emit(row);
  }

  emitExportDataAction(): void {
    this.exportDataAction.emit();
  }

  emitAddNewAction(): void {
    this.addNewAction.emit();
  }

  onNewButtonClick(): void {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}

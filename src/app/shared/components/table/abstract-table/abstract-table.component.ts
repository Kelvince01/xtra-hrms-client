/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {
  AfterViewInit,
  Directive,
  inject,
  OnInit,
  signal,
  Type,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import template from './abstract-table.component.html';
import styles from './abstract-table.component.scss';
import {BaseService} from '@data/services';
import {IBaseModel} from '@data/models';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FilesService} from '@services/common';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, CommonModule, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgMatTableQueryReflectorDirective} from '@shared/directives/ng-mat-table-query-reflector.directive';
import {DataPropertyGetterPipe} from '@shared/pipes/data-property-getter.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbsComponent} from '@shared/components/breadcrumbs/breadcrumbs.component';
import {IExportColumn} from '@models/export-column.model';

export interface DynamicTemplate {
  template: string;
  styles: string | string[];
  imports: (readonly any[] | Type<any>)[] | undefined;
}

export const componentDecoratorPreset: DynamicTemplate = {
  // selector isn't defined here
  // selector: must be defined in the implementation
  template: template,
  styles: styles,
  imports: [
    CommonModule,
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
    BreadcrumbsComponent,
  ],
};

@Directive()
abstract class AbstractTableComponent<T> implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<T>([]);
  displayedColumns: WritableSignal<string[]> = signal<string[]>([]);

  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  filesService = inject(FilesService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  objects: IBaseModel[] = [];

  abstract title: string;
  abstract breadcrumbs: string[];
  hasMenu = false;
  hasNewRoute = false;
  isPageable = false;
  isSortable = false;
  isFilterable = false;
  abstract tableColumns: WritableSignal<ITableColumn[]>;
  rowFilterAction: string = 'filter';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  defaultPageSize = this.pageSizeOptions[1];
  newButtonHidden: boolean = false;
  exportButtonHidden: boolean = false;
  page = 1;
  per_page = 10;
  totalRows = 0;
  currentPage = 0;
  isLoading = signal(false);

  protected router!: Router;
  protected route!: ActivatedRoute;

  cols: IExportColumn[] = [];
  filename = '';
  exportColumns: any[] = [];

  constructor(public service: BaseService<IBaseModel>) {}

  get displayTableColumns(): ITableColumn[] {
    return this.tableColumns().filter((x) => x.name !== 'menu');
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns().map((tableColumn: ITableColumn) => tableColumn.name);

    this.displayedColumns.set(columnNames);

    if (this.hasMenu) {
      this.displayedColumns().push('menu');
    }

    if (this.cols.length) {
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    }

    this.getData();
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  getData(page?: number, per_page?: number) {
    this.service?.get().subscribe(
      (res) => {
        this.isLoading.set(false);
        this.objects = res;
        this.dataSource = new MatTableDataSource<T>(<T[]>res);
      },
      (error) => {
        this.isLoading.set(false);
        this.toastr.error(error);
      },
    );
  }

  onPageChange(event: PageEvent): void {
    // Handle page change event
    this.page = event.pageIndex + 1; // Update page based on event
    this.per_page = event.pageSize; // Update perPage based on event
    this.getData(this.page, this.per_page); // Reload data with updated page and perPage
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns().find(
      (column) => column.name === sortParameters.active,
    )!.dataKey!;
    this.sortData(sortParameters);
  }

  sortData(sortParameters: Sort): Promise<void> | any[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.objects = this.objects.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.objects = this.objects.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getData();
      return this.objects;
    }

    return this.objects;
  }

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.dataSource.data = this.dataSource.data.concat(<T[]>this.objects);
    }
  }

  edit(row: any): void {}

  delete(row: any): void {}

  exportPdf(): void {
    this.filesService.exportPdf(this.cols, this.objects, this.filename);
  }

  exportExcel(): void {
    this.filesService.exportExcel(this.cols, this.filename);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.filesService.saveAsExcelFile(buffer, fileName);
  }

  add(): void {
    if (this.hasNewRoute) {
      this.newRouteNav();
    } else {
    }
  }

  newRouteNav(): void {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}

export {AbstractTableComponent, template, styles};

import { LeaveUpsertComponent } from '@admin-ui/lms/leaves/leave-upsert/leave-upsert.component';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ILeave } from '@data/models/lms.model';
import { IExportColumn } from '@models/export-column.model';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ITableColumn } from '@shared/components/table/table-column.model';
import { NgMatTableQueryReflectorDirective } from '@shared/directives/ng-mat-table-query-reflector.directive';
import { DataPropertyGetterPipe } from '@shared/pipes/data-property-getter.pipe';
import { LeavesActions } from '@stores/lms/leave.action';
import { getMyLeaves } from '@stores/lms/leave.selector';

@Component({
  selector: 'xtra-leave-list',
  standalone: true,
  imports: [
    DataPropertyGetterPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    NgMatTableQueryReflectorDirective,
    TranslateModule,
    RouterLink,
  ],
  template: `
    <ng-container>
      <mat-toolbar>
        <mat-toolbar-row class="flex-row">
          <span class="title basis-[100px]">{{ title }}</span>
          @if (!newButtonHidden) {
            <button class="right-2" mat-raised-button color="primary" routerLink="/lms/add">
              {{ 'common.new-button' | translate }}
            </button>
          }
        </mat-toolbar-row>
      </mat-toolbar>

      @if (isLoading) {
        <div
          style="display: flex; justify-content: center;
           align-items: center; background: white;">
          <mat-progress-bar color="primary" mode="indeterminate"></mat-progress-bar>
        </div>
      }

      <!-- Table -->
      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        (matSortChange)="sortTable($event)"
        xtraNgMatTableQueryReflector
        (scroll)="onTableScroll($event)"
        class="table-container mat-elevation-z8">
        @for (tableColumn of displayTableColumns; track tableColumn) {
          <ng-container [matColumnDef]="tableColumn.name">
            <!-- if sortable column header -->
            @if (tableColumn.isSortable) {
              <th
                mat-header-cell
                *matHeaderCellDef
                [mat-sort-header]="tableColumn.name"
                [arrowPosition]="tableColumn.position === 'right' ? 'before' : 'after'">
                {{ tableColumn.name }}
              </th>
            } @else {
              <th
                mat-header-cell
                *matHeaderCellDef
                [class.text-right]="tableColumn.position === 'right'">
                {{ tableColumn.name }}
              </th>
            }
            <!-- else not sortable -->

            <!-- column data -->
            <td
              mat-cell
              *matCellDef="let element"
              [class.text-right]="tableColumn.position === 'right'">
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
                        name="search" />
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
                    (click)="exportPdf()">
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

        <!-- Menu Column -->
        @if (displayedColumns().includes('menu')) {
          <ng-container matColumnDef="menu">
            <th mat-header-cell *matHeaderCellDef>{{ 'common.caption.actions' | translate }}</th>
            <td
              mat-cell
              *matCellDef="let element"
              [attr.data-label]="'common.caption.actions' | translate">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="edit(element.id)">
                  <mat-icon>edit</mat-icon>
                  <span>{{ 'common.menu.edit' | translate }}</span>
                </button>
                <button mat-menu-item (click)="delete(element)">
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
      @if (dataSource.data.length === 0) {
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
          aria-label="Select page"></mat-paginator>
      }
    </ng-container>
  `,
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
export class LeaveListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: WritableSignal<string[]> = signal<string[]>([]);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  hasMenu = true;
  isPageable = true;
  isPaginated = false;
  isSortable = true;
  isFilterable = true;
  rowFilterAction: string = 'filter';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  defaultPageSize = this.pageSizeOptions[1];
  newButtonHidden: boolean = false;
  exportButtonHidden: boolean = false;
  addNewRoute = '';
  hasNewRoute = false;
  isLoading = false;

  title = 'Leaves';
  cols: IExportColumn[] = [];
  filename = 'Leaves';
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
    {
      name: 'position',
      dataKey: 'position',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'name',
      dataKey: 'name',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'weight',
      dataKey: 'weight',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'symbol',
      dataKey: 'symbol',
      position: 'right',
      isSortable: false,
    },
  ]);

  page = 1;
  per_page = 10;
  totalData: number = 0;
  totalRows = 0;
  currentPage = 0;
  pageSize = 5;
  objects!: PeriodicElement[];
  exportColumns: any[] = [];

  private dialog = inject(MatDialog);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  // filesService = inject(FilesService);
  private readonly store = inject(Store);

  private upsert!: LeaveUpsertComponent;
  doggos = this.store.selectSignal(getMyLeaves);

  constructor() {}

  get displayTableColumns(): ITableColumn[] {
    // tslint:disable-next-line:no-non-null-assertion
    return this.tableColumns()!.filter(x => x.name !== 'menu');
  }

  // we need this, to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns().map((tableColumn: ITableColumn) => tableColumn.name);

    this.displayedColumns.set(columnNames);

    if (this.hasMenu) {
      this.displayedColumns().push('menu');
    }

    if (this.cols.length) {
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field,
      }));
    }

    // this.loadData(this.page, this.per_page);
    this.loadData();
    this.store.dispatch(LeavesActions.loadMyLeaves());
  }

  loadData(page?: number, per_page?: number): void {
    // this.isLoading = true;
    this.objects = ELEMENT_DATA;
    // this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.dataSource.data = ELEMENT_DATA;

    /*setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = ELEMENT_DATA.length;
    });*/

    // eslint-disable-next-line no-console
    console.log(this.objects);

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.isLoading = false;
  }

  add(): void {}

  edit(id: number): void {}

  delete(element: any): void {}

  deleteDoggo(leave: ILeave): void {
    this.store.dispatch(LeavesActions.deleteLeave({ leave }));
  }

  exportPdf(): void {
    // this.filesService.exportPdf(this.cols, this.objects, this.filename);
  }

  exportExcel(): void {
    // this.filesService.exportExcel(this.cols, this.filename);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // this.filesService.saveAsExcelFile(buffer, fileName);
  }

  sortData(sortParameters: Sort): PeriodicElement[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.objects = this.objects.sort((a: PeriodicElement, b: PeriodicElement) =>
        (a as any)[keyName].localeCompare((b as any)[keyName]),
      );
    } else if (sortParameters.direction === 'desc') {
      this.objects = this.objects.sort((a: PeriodicElement, b: PeriodicElement) =>
        (b as any)[keyName].localeCompare((a as any)[keyName]),
      );
    } else {
      return ELEMENT_DATA;
    }

    return this.objects;
  }

  onTableScroll(e: any): void {
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
    this.loadData(this.page, this.per_page); // Reload data with updated page and perPage
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns().find(
      column => column.name === sortParameters.active,
    )!.dataKey!;
    this.sortData(sortParameters);
  }

  newRouteNav(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];

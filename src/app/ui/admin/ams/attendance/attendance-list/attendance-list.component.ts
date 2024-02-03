import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe, PercentPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {IAsset} from '@models/organizations.model';
import {FilesService} from '@services/common/files.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {AssetService} from '@services/assets.service';
import {AssetPageComponent} from '@admin-ui/orgs/assets/asset-page/asset-page.component';

@Component({
  selector: 'xtra-attendance-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div class="example-container mat-elevation-z8">
      <mat-table #table [dataSource]="dataSource" (scroll)="onTableScroll($event)">
        <!--- Note that these columns can be defined in any order.
                          The actual rendered columns are set as a property on the row definition" -->

        <!-- Position Column -->
        <ng-container matColumnDef="position">
          <mat-header-cell *matHeaderCellDef>No.</mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.position }}</mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="weight">
          <mat-header-cell *matHeaderCellDef>Weight</mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.weight }}</mat-cell>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="symbol">
          <mat-header-cell *matHeaderCellDef>Symbol</mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.symbol }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns; sticky: isSticky()"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
      </mat-table>
    </div>
  `,
  styles: [
    `
      .example-container {
        display: flex;
        flex-direction: column;
        max-height: 500px;
        min-width: 300px;
      }

      .mat-table {
        overflow: auto;
        max-height: 500px;
      }
    `,
  ],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceListComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;
  sticky: boolean = true;

  assets!: IAsset[];
  assetsTableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([]);
  title = 'Assets';
  service = inject(AssetService);
  filesService = inject(FilesService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  isLoading = true;

  cols: any[] = [];
  exportColumns: any[] = [];

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe,
  ) {}

  ngOnInit(): void {
    this.dataSource = this.getTableData(this.start, this.end);
    this.updateIndex();

    this.initializeColumns();
    this.getAssets();

    this.cols = [
      {
        field: 'name',
        header: 'Name',
        customExportHeader: 'Name',
        dataKey: 'name',
      },
      {field: 'description', header: 'Description', dataKey: 'description'},
      {field: 'purchase_cost', header: 'Purchase Cost', dataKey: 'purchase_cost'},
      {field: 'purchase_date', header: 'Purchase Date', dataKey: 'purchase_date'},
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      const data = this.getTableData(this.start, this.end);
      this.dataSource = this.dataSource.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start: any, end: any): Element[] {
    return ELEMENT_DATA.filter((value, index) => index >= start && index < end);
  }

  updateIndex(): void {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  isSticky(): boolean {
    return this.sticky;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AssetPageComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.getAssets();
    });
  }

  sortData(sortParameters: Sort): void | IAsset[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.assets = this.assets.sort((a: IAsset, b: IAsset) =>
        (<any>a)[keyName].localeCompare((<any>b)[keyName]),
      );
    } else if (sortParameters.direction === 'desc') {
      this.assets = this.assets.sort((a: IAsset, b: IAsset) =>
        (<any>b)[keyName].localeCompare((<any>a)[keyName]),
      );
    } else {
      return this.getAssets();
    }

    return this.assets;
  }

  editAsset(id: number): void {
    const dialogRef = this.dialog.open(AssetPageComponent, {
      data: {id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAssets();
    });
  }

  removeAsset(asset: IAsset): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.service.delete(asset.id!).subscribe(
          () => {
            this.toastr.success('Asset deleted successfully', 'Success');
            Swal.fire('Removed!', 'Asset removed successfully.', 'success');

            this.getAssets();
          },

          (error) => {
            this.toastr.error(`Error when deleting asset ${error}`, 'Failed');
          },
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Asset not deleted.)', 'error');
      }
    });
  }

  initializeColumns(): void {
    this.assetsTableColumns.set([
      {
        name: 'Name',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Description',
        dataKey: 'description',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Status',
        dataKey: 'status',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Purchase Cost',
        dataKey: 'purchase_cost',
        position: 'right',
        isSortable: false,
      },
      {
        name: 'Purchase Date',
        dataKey: 'purchase_date',
        position: 'right',
        isSortable: true,
      },
      {
        name: 'Tracking ID',
        dataKey: 'tracking_id',
        position: 'right',
        isSortable: false,
      },
    ]);
  }

  getAssets(): void {
    this.service.get().subscribe(
      (_) => {
        this.isLoading = false;
        this.assets = _;
      },
      (_: any) => {
        this.isLoading = false;
      },
    );
  }

  exportPdf(): void {
    this.filesService.exportPdf(this.cols, this.assets, 'Assets List');
  }

  exportExcel(): void {
    this.filesService.exportExcel(this.cols, 'Assets List');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.filesService.saveAsExcelFile(buffer, fileName);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 31, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 32, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 33, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 34, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 35, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 36, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 37, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 38, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 39, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 40, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 41, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 42, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 43, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 44, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 45, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 46, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 47, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 48, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 49, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 50, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 51, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 52, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 53, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 54, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 55, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 56, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 57, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 58, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 59, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 60, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

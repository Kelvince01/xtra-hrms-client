// import {CurrencyPipe, DecimalPipe, PercentPipe} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IAsset} from '@data/models/organizations.model';
import {AssetService} from '@data/services/assets.service';
import {FilesService} from '@data/services/common/files.service';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {TableComponent} from '@shared/components/table/table.component';
import {ToastrService} from 'ngx-toastr';
import {AssetPageComponent} from '@admin-ui/orgs/assets/asset-page/asset-page.component';
import {Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';

// (sort)="sortData($event)"

@Component({
  selector: 'xtra-asset-list',
  standalone: true,
  imports: [TableComponent],
  template: `
    <xtra-table
      [tableData]="assets"
      [tableColumns]="assetsTableColumns"
      [title]="title"
      [hasMenu]="true"
      [isLoading]="isLoading"
      [isFilterable]="true"
      [isPageable]="true"
      [pageSizeOptions]="[2, 4, 6]"
      [defaultPageSize]="4"
      (addNewAction)="openDialog()"
      (rowDeleteAction)="removeAsset($event)"
      (rowEditAction)="editAsset($event)"
      (exportDataAction)="exportPdf()"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetListComponent implements OnInit {
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

  constructor() {} // private percentPipe: PercentPipe, // private decimalPipe: DecimalPipe, // private currencyPipe: CurrencyPipe,

  ngOnInit(): void {
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
      (res) => {
        this.isLoading = false;
        this.assets = res;
      },
      (error: any) => {
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

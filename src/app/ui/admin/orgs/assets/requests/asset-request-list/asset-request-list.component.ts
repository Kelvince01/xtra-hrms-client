import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {IExportColumn} from '@models/export-column.model';

@Component({
  selector: 'xtra-asset-request-list',
  standalone: true,
  imports: [],
  template: `
    <p>asset-request-list works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetRequestListComponent {
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
    {
      name: 'Requested By',
      dataKey: 'requested_employee',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Category',
      dataKey: 'asset_category',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Request Date',
      dataKey: 'asset_request_date',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Description',
      dataKey: 'description',
      position: 'right',
      isSortable: false,
    },
    {
      name: 'Asset Request Status',
      dataKey: 'asset_request_status',
      position: 'right',
      isSortable: true,
    },
  ]);
  title = 'Asset Requests';
  filename = 'Asset Requests';

  cols: IExportColumn[] = [
    {
      field: 'asset_category',
      header: 'Category',
      customExportHeader: 'Category',
      dataKey: 'asset_category',
    },
    {field: 'description', header: 'Description', dataKey: 'description'},
  ];
}

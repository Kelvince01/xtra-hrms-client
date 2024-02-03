import {ChangeDetectionStrategy, Component, WritableSignal, signal} from '@angular/core';
import {IExportColumn} from '@data/models/export-column.model';
import {ITableColumn} from '@shared/components/table/table-column.model';

@Component({
  selector: 'xtra-asset-lot-list',
  standalone: true,
  imports: [],
  template: `
    <p>asset-lot-list works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetLotListComponent {
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
    {
      name: 'Number',
      dataKey: 'lot_number',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Description',
      dataKey: 'lot_description',
      position: 'left',
      isSortable: true,
    },
  ]);
  title = 'Asset Lots';
  filename = 'Asset Lots';

  cols: IExportColumn[] = [
    {
      field: 'lot_number',
      header: 'Number',
      customExportHeader: 'Number',
      dataKey: 'lot_number',
    },
    {field: 'lot_description', header: 'Description', dataKey: 'lot_description'},
  ];
}

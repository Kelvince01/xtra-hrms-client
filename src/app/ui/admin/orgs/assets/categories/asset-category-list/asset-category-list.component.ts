import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {IExportColumn} from '@models/export-column.model';
import {ITableColumn} from '@shared/components/table/table-column.model';

@Component({
  selector: 'xtra-asset-category-list',
  standalone: true,
  imports: [],
  template: `
    <p>asset-category-list works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetCategoryListComponent {
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
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
  ]);
  title = 'Asset Categories';
  filename = 'Asset Categories';

  cols: IExportColumn[] = [
    {
      field: 'name',
      header: 'Name',
      customExportHeader: 'Name',
      dataKey: 'name',
    },
    {field: 'description', header: 'Description', dataKey: 'description'},
  ];
}

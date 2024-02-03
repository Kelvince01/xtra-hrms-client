import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {IExportColumn} from '@models/export-column.model';
import {TableComponent} from '@shared/components/table/table.component';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {StagesService} from '@services/recruitments.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-stage-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <xtra-table [title]="title" [tableColumns]="tableColumns" />
  `,
  styles: ``,
  providers: [StagesService],
})
export class StageListComponent {
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
    {
      name: 'Stage',
      dataKey: 'stage',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Stage Type',
      dataKey: 'stage_type',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Sequence',
      dataKey: 'sequence',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Active',
      dataKey: 'is_active',
      position: 'right',
      isSortable: false,
    },
  ]);
  title = 'Stages';
  filename = 'Stages';

  cols: IExportColumn[] = [
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
  isPaginated = true;
}

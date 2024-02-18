import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PayrollsService } from '@services/finance.service';
import { ITableColumn } from '@shared/components/table/table-column.model';
import { TableComponent } from '@shared/components/table/table.component';

@Component({
  selector: 'xtra-payroll-list',
  standalone: true,
  imports: [TableComponent],
  template: `
    <xtra-table [title]="title" [tableColumns]="tableColumns" [tableData]="[]" />
  `,
  styles: [``],
  providers: [PayrollsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollListComponent {
  title = 'Payrolls';
  tableColumns = signal<ITableColumn[]>([
    {
      name: 'Name',
      dataKey: 'name',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Group',
      dataKey: 'group',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Subject',
      dataKey: 'subject',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Sender Email',
      dataKey: 'sender_email',
      position: 'right',
      isSortable: false,
    },
    {
      name: 'Username',
      dataKey: 'username',
      position: 'right',
      isSortable: true,
    },
    {
      name: 'Outgoing Server',
      dataKey: 'outgoing_server',
      position: 'right',
      isSortable: false,
    },
  ]);
}

import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {TableComponent} from '@shared/components/table/table.component';
import {BanksService} from '@services/finance.service';

@Component({
  selector: 'xtra-bank-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <xtra-table [title]="title" [tableColumns]="tableColumns" [tableData]="[]" />
  `,
  styles: ``,
  providers: [BanksService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankListComponent {
  title = 'Banks';
  tableColumns = signal<ITableColumn[]>([
    {
      name: 'Name',
      dataKey: 'name',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Branch',
      dataKey: 'branch',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Swift Code',
      dataKey: 'swift_code',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Town',
      dataKey: 'town',
      position: 'right',
      isSortable: false,
    },
    {
      name: 'Bank Number',
      dataKey: 'bank_no',
      position: 'right',
      isSortable: true,
    },
    {
      name: 'Country',
      dataKey: 'country',
      position: 'right',
      isSortable: false,
    },
  ]);
}

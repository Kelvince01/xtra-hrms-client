import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {TableComponent} from '@shared/components/table/table.component';

@Component({
  selector: 'xtra-recruitment-list',
  standalone: true,
  imports: [TableComponent],
  template: `
    <xtra-table [tableColumns]="tableColumns" [title]="title" [tableData]="tableData"></xtra-table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentListComponent {
  title = 'Recruitments';
  tableColumns = signal([]);
  tableData = [];
}

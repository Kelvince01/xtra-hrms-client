import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {TableV2Component} from '@shared/components/table/table-v2.component';

@Component({
  selector: 'xtra-recruitment-list',
  standalone: true,
  imports: [TableV2Component],
  template: `
    <xtra-table-v2
      [tableColumns]="tableColumns"
      [title]="title"
      [tableData]="tableData"
    ></xtra-table-v2>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentListComponent {
  title = 'Recruitments';
  tableColumns = signal([]);
  tableData = [];
}

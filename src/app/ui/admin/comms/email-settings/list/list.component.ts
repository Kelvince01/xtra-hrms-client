import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {IEmailSetting} from '@data/models/communication.model';
import {ITableColumn} from '@shared/components/table/table-column.model';
import {EmailSettingsService} from '@services/comms.service';
import {TableComponent} from '@shared/components/table/table.component';
import {PageComponent} from '@admin-ui/comms/email-settings/page/page.component';

@Component({
  selector: 'xtra-email-settings-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="my-3">
      <button mat-flat-button color="primary">Add Email Settings</button>
    </div>
    <!-- <xtra-table [tableColumns]="_tableColumns" [title]="_title" /> -->
  `,
  styles: [],
  providers: [EmailSettingsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  // export class ListComponent implements OnInit {
  _tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([]);
  _title = 'Email Settings';

  constructor(service: EmailSettingsService, upsert: PageComponent) {}

  ngOnInit(): void {
    this.initializeColumns();
  }

  initializeColumns(): void {
    this._tableColumns.set([
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
}

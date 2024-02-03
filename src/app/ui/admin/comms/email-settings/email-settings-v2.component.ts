import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {EmailSettingsService} from '@services/comms.service';
import {TableComponent} from '@shared/components/table/table.component';

@Component({
  selector: 'xtra-email-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, TableComponent],
  template: `
    <!--    <xtra-generic-table [tableData]="service.objects()" [columnDefinition]="_columnDefinition" />-->
  `,
  styles: [``],
  providers: [EmailSettingsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSettingsV2Component implements OnInit {
  service = inject(EmailSettingsService);
  _columnDefinition = [
    'name',
    'group',
    'subject',
    'sender_email',
    'username',
    'outgoing_server',
    'CRUD_OPERATION',
  ];

  ngOnInit(): void {
    this.service.get();
  }
}

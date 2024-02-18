import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { TrainingsService } from '@data/services';
import { ITraining } from '@models/training.model';
import { FilesService } from '@services/common';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { ITableColumn } from '@shared/components/table/table-column.model';
import { TableComponent } from '@shared/components/table/table.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xtra-training-list',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent],
  template: `
    <xtra-breadcrumbs [items]="breadcrumbs"></xtra-breadcrumbs>
    <xtra-table
      [tableData]="trainings"
      [tableColumns]="tableColumns"
      [title]="title"
      [hasMenu]="true"
      [isFilterable]="true"
      [isPageable]="true"
      [isLoading]="isLoading"></xtra-table>
  `,
  providers: [TrainingsService],
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingListComponent implements OnInit {
  trainings: ITraining[] = [];
  tableColumns: WritableSignal<ITableColumn[]> = signal<ITableColumn[]>([
    {
      name: 'Name',
      dataKey: 'training_name',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Description',
      dataKey: 'description',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Date',
      dataKey: 'date',
      position: 'right',
      isSortable: true,
    },
    {
      name: 'Employee',
      dataKey: 'employee',
      position: 'right',
      isSortable: false,
    },
  ]);
  title = 'Trainings';
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  breadcrumbs: string[] = ['Admin', 'Trainings', 'Trainings'];
  isLoading = false;

  filesService = inject(FilesService);

  constructor(private service: TrainingsService) {}

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings() {
    this.service?.get().subscribe(
      res => {
        this.isLoading = false;
        this.trainings = res;
      },
      error => {
        this.isLoading = false;
        this.toastr.error(error);
      },
    );
  }
}

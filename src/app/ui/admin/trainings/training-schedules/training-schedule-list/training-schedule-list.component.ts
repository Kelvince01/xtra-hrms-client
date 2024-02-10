import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {
  AbstractTableComponent,
  componentDecoratorPreset,
} from '@shared/components/table/abstract-table/abstract-table.component';
import {ITrainingSchedule} from '@models/training.model';
import {TrainingSchedulesService} from '@data/services';
import {ITableColumn} from '@shared/components/table/table-column.model';

@Component({
  selector: 'xtra-training-schedule-list',
  standalone: true,
  imports: componentDecoratorPreset.imports,
  template: componentDecoratorPreset.template,
  styles: componentDecoratorPreset.styles,
  providers: [TrainingSchedulesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingScheduleListComponent extends AbstractTableComponent<ITrainingSchedule> {
  constructor(service: TrainingSchedulesService) {
    super(service);
  }

  title: string = 'Training Schedules';
  breadcrumbs: string[] = ['Admin', 'Trainings', 'Schedules'];
  tableColumns: WritableSignal<ITableColumn[]> = signal([
    {
      name: 'Name',
      dataKey: 'programme',
      position: 'left',
      isSortable: true,
    },
    {
      name: 'Duration',
      dataKey: 'duration',
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
      name: 'Venue',
      dataKey: 'venue',
      position: 'right',
      isSortable: false,
    },
    {
      name: 'Purpose',
      dataKey: 'purpose',
      position: 'right',
      isSortable: false,
    },
  ]);
}

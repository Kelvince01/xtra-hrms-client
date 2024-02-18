import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HolidayItemComponent } from '@admin-ui/lms/holidays/holiday-item/holiday-item.component';
import { IHoliday } from '@models/lms.model';
import { HolidaysService } from '@services/lms.service';

@Component({
  selector: 'xtra-holiday-list',
  standalone: true,
  imports: [HolidayItemComponent],
  template: `
    @for (holiday of holidays(); track holiday.id) {
      @defer (on viewport) {
        <xtra-holiday-item [holiday]="holiday" (loaded)="loaded($event)" />
      } @placeholder {
        <div>loading...</div>
      }
    }
  `,
  styles: ``,
  providers: [HolidaysService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidayListComponent {
  protected readonly holidays = signal<IHoliday[]>([]);
  private total = 0;

  constructor(protected readonly service: HolidaysService) {
    this.loadHolidays(0);
  }

  private loadHolidays(page: number): void {
    this.service
      .get
      // { pageNumber: page }
      ();
    const holidays: string | any[] = [];
    this.total = holidays.length;

    this.holidays.update(oldHolidays => {
      return [...oldHolidays, ...holidays];
    });
  }

  loaded(id: number): void {
    if (this.holidays().length < this.total && this.holidays().at(-2)?.id === id) {
      this.loadHolidays(this.holidays().length / 5);
    }
  }
}

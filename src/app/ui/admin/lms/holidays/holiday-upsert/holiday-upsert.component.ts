import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IHoliday } from '@models/lms.model';
import { FormBy } from '@shared/utils';

@Component({
  selector: 'xtra-holiday-upsert',
  standalone: true,
  imports: [],
  template: `
    <p>holiday-upsert works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidayUpsertComponent {
  fb = inject(FormBuilder);

  form!: FormBy<IHoliday>;

  initForm(): void {
    this.form = this.fb.group({
      name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      start_date: new FormControl<Date>(null as any),
      end_date: new FormControl<Date>(null as any),
      recurring: new FormControl<boolean>(false),
    }) as FormBy<IHoliday>;
  }
}

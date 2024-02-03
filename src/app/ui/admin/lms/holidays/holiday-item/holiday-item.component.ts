import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IHoliday} from '@models/lms.model';

@Component({
  selector: 'xtra-holiday-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>
      <a [href]="'https://interview.community/question/' + holiday.id" target="_blank">
        {{ holiday.name }}
      </a>
    </h1>
    <div>From {{ holiday.start_date }} to {{ holiday.end_date }}</div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 20px;
      }
    `,
  ],
})
export class HolidayItemComponent implements OnInit {
  @Input({required: true}) holiday!: IHoliday;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit(): void {
    this.loaded.emit(this.holiday.id);
  }
}

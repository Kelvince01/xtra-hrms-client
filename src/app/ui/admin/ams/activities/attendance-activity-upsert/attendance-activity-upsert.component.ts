import { Component } from '@angular/core';

@Component({
  selector: 'xtra-attendance-activity-upsert',
  standalone: true,
  imports: [],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 m-5">
      <div class="border p-4 text-center col-span-1 lg:col-span-2">
        Takes one column on mobile and two on desktop
      </div>
      <div class="border p-4 text-center">One of three columns</div>
      <div class="border p-4 text-center">One of three columns</div>
    </div>
  `,
  styles: ``,
})
export class AttendanceActivityUpsertComponent {}

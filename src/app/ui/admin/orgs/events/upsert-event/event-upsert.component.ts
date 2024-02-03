import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xtra-upsert-event',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>New Event</h2>
      <form>
        <button type="submit">Save</button>
      </form>
    </div>
  `,
  styles: []
})
export class EventUpsertComponent {}

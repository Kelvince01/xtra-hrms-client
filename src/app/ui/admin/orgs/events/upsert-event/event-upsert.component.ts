import { Component } from '@angular/core';

@Component({
  selector: 'xtra-upsert-event',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h2>New Event</h2>
      <form>
        <button type="submit">Save</button>
      </form>
    </div>
  `,
  styles: [],
})
export class EventUpsertComponent {}

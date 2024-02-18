import { ChangeDetectionStrategy, Component, Input, signal, Signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { EventsService } from '@data/services/orgs.service';
import { IEvent } from '@models/organizations.model';

@Component({
  selector: 'xtra-event-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Events</h2>
    <ul>
      @for (event of events(); track event.id) {
        <li>
          <a [routerLink]="['/org/events', event.id]">{{ event.title }}</a>
        </li>
      }
      @if (events().length === 0) {
        <li>No events found.</li>
      }
    </ul>
  `,
  styles: [``],
  providers: [EventsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
  @Input() events: Signal<IEvent[]> = signal([]);
}

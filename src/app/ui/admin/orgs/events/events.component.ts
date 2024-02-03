import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  WritableSignal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {EventsService} from '@data/services/orgs.service';
import {EventListComponent} from '@admin-ui/orgs/events/event-list/event-list.component';
import {IEvent} from '@models/organizations.model';

@Component({
  selector: 'xtra-events',
  standalone: true,
  imports: [CommonModule, RouterLink, EventListComponent],
  template: `
    <div>
      <h1>
        <a routerLink="/org/events">Event Management System</a>
      </h1>
      <xtra-event-list [events]="events" />
    </div>
  `,
  styles: [``],
  providers: [EventsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  service = inject(EventsService);
  events: WritableSignal<IEvent[]> = signal([]);

  ngOnInit(): void {
    this.service.get().subscribe((res) => {
      this.events.set(res);
    });
  }
}

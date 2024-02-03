import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {IEvent} from '@models/organizations.model';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'xtra-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p>Date: {{ event.start_at }}</p>
    <p>Time: {{ event.start_at | date: 'short' }}</p>
    <p>Location: {{ event.location }}</p>
    <h3>Attendees</h3>
    <ul>
      @for (attendee of event.attendees; track attendee) {
        <li>{{ attendee.user.username }}</li>
      }
      @if (event.attendees!.length === 0) {
        <li>No attendees yet.</li>
      }
    </ul>
    @if (authService.isAuthenticated() && authService.user().id !== event.owner) {
      <div>
        <a routerLink="/org/events/join">Register for Event</a>
        <!--      href="{% url 'register_event' event.id %}"-->
      </div>
    }
  `,
  styles: [],
})
export class EventDetailComponent {
  event!: IEvent;

  authService = inject(AuthService);
}

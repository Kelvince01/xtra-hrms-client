import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserModel } from '../../../../../../data/models/user.model';
import {DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'xtra-user-card',
  standalone: true,
  imports: [
    NgClass,
    DatePipe
  ],
  template: `
    <span [ngClass]="{ 'is-empty': isEmpty }">{{ user.email }}</span>
    <div>
      <span>{{ user.created_at | date : 'hh:mm:ss a' }}</span>
      <i (click)="remove(user.id!)">delete</i>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent  implements OnChanges {
  @Input({ required: true }) user!: UserModel;

  @Output() removeUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() editUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  isEmpty = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['user']) {
      const { currentValue } = changes['user'];
      this.isEmpty = !currentValue.content.length;
    }
  }

  remove(id: number): void {
    this.removeUser.emit(Number(id));
  }

  edit(email: string): void {
    this.editUser.emit({ ...this.user, email });
  }
}
import { DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeModel } from '@data/models';
import { TruncateDirective } from '@shared/directives/truncate.directive';

@Component({
  selector: 'xtra-employee-list-item',
  standalone: true,
  imports: [DatePipe, NgClass, RouterLink, NgOptimizedImage, TruncateDirective],
  template: `
    <div class="article-preview">
      <div class="article-meta">
        <a>
          <img [ngSrc]="employee.photo!" width="20" height="20" />
        </a>
        <div class="info">
          <a
            data-e2e-id="article-author"
            class="author"
            [routerLink]="['/profile', employee.firstname]">
            {{ employee.firstname }}
          </a>
          <p xtraTruncate [limit]="10">{{ employee.surname }}</p>
          <span class="date">
            {{ employee.created_at | date: 'longDate' }}
          </span>
        </div>
        <span [hidden]="!canModify">
          <a class="btn btn-sm btn-outline-secondary" [routerLink]="['/edit', employee.id]">
            <i class="ion-edit"></i>
            Edit
          </a>

          <button class="btn btn-sm btn-outline-danger" (click)="deleteEmployee()">
            <i class="ion-trash-a"></i>
            Delete
          </button>
        </span>
      </div>
      <a (click)="navigateToEmployee.emit(employee.id?.toString())" class="preview-link">
        <h1 data-e2e-id="article-list-title">{{ employee.surname }}</h1>
        <p>{{ employee.email }}</p>
        <span>Read more...</span>
      </a>
    </div>

    <!--
<mat-card>
    <mat-card-header>
        <mat-card-title>Title</mat-card-title>
        <mat-card-subtitle>Subtitle</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
        <p>Content here.</p>
    </mat-card-content>
</mat-card>
-->
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListItemComponent {
  @Input() employee!: EmployeeModel;
  @Output() navigateToEmployee: EventEmitter<string> = new EventEmitter();
  @Input() canModify!: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  deleteEmployee() {
    this.delete.emit(this.employee.id?.toString());
  }
}

/*
<div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
  <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="Woman's Face" />
  <div class="text-center space-y-2 sm:text-left">
    <div class="space-y-0.5">
      <p class="text-lg text-black font-semibold">
        Erin Lindford
      </p>
      <p class="text-slate-500 font-medium">
        Product Engineer
      </p>
    </div>
    <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
  </div>
</div>
 */

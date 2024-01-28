import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {EmployeeModel} from '@data/models';
import {DatePipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'xtra-employee-list-item',
  standalone: true,
  imports: [DatePipe, NgClass, RouterLink],
  template: `
    <div class="article-preview">
      <div class="article-meta">
        <a>
          <img [src]="employee.photo" />
        </a>
        <div class="info">
          <a
            data-e2e-id="article-author"
            class="author"
            [routerLink]="['/profile', employee.firstname]"
          >
            {{ employee.firstname }}
          </a>
          <span class="date">
            {{ employee.created_at | date: 'longDate' }}
          </span>
        </div>
        <span [hidden]="!canModify">
          <a class="btn btn-sm btn-outline-secondary" [routerLink]="['/edit', employee.id]">
            <i class="ion-edit"></i>
            Edit Article
          </a>

          <button class="btn btn-sm btn-outline-danger" (click)="deleteArticle()">
            <i class="ion-trash-a"></i>
            Delete Article
          </button>
        </span>
      </div>
      <a (click)="navigateToArticle.emit(employee.id?.toString())" class="preview-link">
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
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();
  @Input() canModify!: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  deleteArticle() {
    this.delete.emit(this.employee.id?.toString());
  }
}

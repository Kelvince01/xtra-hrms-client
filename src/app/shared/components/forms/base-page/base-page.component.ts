import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-base-page',
  standalone: true,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <ng-content select="[title]'"></ng-content>
        </mat-card-title>
        <mat-card-subtitle>
          <ng-content select="[sub-title]"></ng-content>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions>
        <mat-action-row>
          <button mat-button color="primary" (click)="onBackButtonClick()">
            {{ 'common.back-button' | translate }}
          </button>
          @if (!saveButtonHidden) {
            <button
              mat-raised-button
              color="primary"
              [disabled]="saveButtonDisabled"
              (click)="onSaveButtonClick()">
              {{ 'common.save-button' | translate }}
            </button>
          }
          <mat-divider></mat-divider>
          <div style="flex-grow: 0.2">
            <!--button mat-icon-button [matMenuTriggerFor]="actionsMenu" *ngIf="vm?.actions?.length">
              <span>{{ 'common.caption.actions' | translate }}</span>
              <mat-icon>keyboard_arrow_down</mat-icon>
            </button>
            <mat-menu #actionsMenu="matMenu">
              <button *ngFor="let action of vm?.actions" mat-menu-item (click)="vm.invokeAction(action)">
                <mat-icon *ngIf="action.icon">{{ action.icon }}</mat-icon>
                <span>{{ action.caption | translate }}</span>
              </button>
            </mat-menu-->
          </div>
        </mat-action-row>
      </mat-card-actions>
    </mat-card>
  `,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule,
    MatExpansionModule,
    MatDividerModule,
  ],
})
export class BasePageComponent implements OnInit {
  @Input() saveButtonDisabled: boolean = false;
  @Input() saveButtonHidden: boolean = false;

  @Output() save = new EventEmitter();

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onBackButtonClick(): void {
    this.location.back();
  }

  onSaveButtonClick(): void {
    this.save.next(null);
  }
}

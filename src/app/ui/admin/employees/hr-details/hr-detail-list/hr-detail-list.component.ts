import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {HrDetailsService} from '@data/services/employees.service';
import {IHrDetail} from '@models/employee.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'xtra-hr-detail-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-toolbar color="primary">
      Hr Details ({{ hrDetails().length }})

      <button mat-icon-button routerLink="/employees/hr-details/add" [disabled]="maxReached()">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <mat-list>
      @for (hrDetail of hrDetails(); track hrDetail.id) {
        <mat-list-item>
          <h3 matListItemTitle>
            {{ hrDetail.job_number }}
          </h3>
          <p matListItemLine>
            {{ hrDetail.job_title }}
          </p>
          <button matListItemMeta mat-icon-button (click)="service.delete(hrDetail.id!)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-list-item>
      }
    </mat-list>
    @if (loading) {
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    }
  `,
  styles: ``,
  providers: [HrDetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HrDetailListComponent implements OnInit {
  service = inject(HrDetailsService);
  hrDetails = signal<IHrDetail[]>([]);
  readonly MAX_HR_DETAILS_ALLOWED = 21;
  totalHrDetails = computed(() => this.hrDetails().length);
  maxReached = computed(() => this.totalHrDetails() >= this.MAX_HR_DETAILS_ALLOWED);
  // loading = inject(LoaderService).loading;
  loading = false;
  snackbar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.service.getPaginated().subscribe((_) => {
      this.hrDetails.set(_.results);
    });
  }
}

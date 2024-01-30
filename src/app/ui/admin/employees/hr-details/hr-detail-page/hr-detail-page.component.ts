import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {IHrDetail} from '@data/models/employee.model';
import {HrDetailsService} from '@data/services/employees.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'xtra-hr-detail-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Add HR Details</h2>
      <div class="fields">
        <mat-form-field>
          <input [(ngModel)]="hr_detail.job_number" placeholder="Job Number" matInput />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="hr_detail.employment_type" placeholder="Employment Type" matInput />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="hr_detail.job_title" placeholder="Job Title" matInput />
        </mat-form-field>
        <!--              <ui-date></ui-date>-->
        <!-- <mat-form-field>
                <mat-select
                  [ngModel]="country()"
                  placeholder="Country"
                  (ngModelChange)="country.set($event)"
                >
                  <mat-option *ngFor="let country of countries()" [value]="country">{{
                    country
                  }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field>
                <mat-select [(ngModel)]="city" placeholder="City">
                  <mat-option *ngFor="let city of cities()" [value]="city">{{
                    city
                  }}</mat-option>
                </mat-select>
              </mat-form-field> -->
      </div>
      <div class="actions">
        <button mat-raised-button color="primary" (click)="save()">Save</button>
        <button mat-raised-button routerLink="/employees/hr-details">Back</button>
      </div>
    </div>
  `,
  styles: `
      .container {
        padding: 24px;
      }

      .fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HrDetailPageComponent {
  service = inject(HrDetailsService);

  hr_detail!: IHrDetail;

  countries = signal(['United Kingdom', 'Pakistan', 'India']);

  country = signal('');

  cities = computed(() => {
    if (this.country() === 'United Kingdom') return ['London', 'Manchester', 'Glasgow'];
    if (this.country() === 'Pakistan') return ['Lahore', 'Karachi', 'Islamabad'];
    if (this.country() === 'India') return ['Delhi', 'Mumbai', 'Hyderabad'];

    return [];
  });

  save() {
    this.service.create(this.hr_detail);
  }
}

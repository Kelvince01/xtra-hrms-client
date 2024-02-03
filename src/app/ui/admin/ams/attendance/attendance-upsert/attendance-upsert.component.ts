import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {map, Observable, of} from 'rxjs';
import {IAttendance, IEmployeeShiftDay} from '@models/attendance.model';
import {MatSelectModule} from '@angular/material/select';
import {FormLayoutComponent} from '@shared/components/forms/form-layout';
import {AttendanceService} from '@services/attendance.service';

@Component({
  selector: 'xtra-attendance-upsert',
  standalone: true,
  imports: [
    CommonModule,
    FormLayoutComponent,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  template: `
    <xtra-form-layout
      class="attendance-page"
      innerClass="col-md-10 offset-md-1 col-xs-12"
      title="Upsert Attendance"
    >
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit(form)"
        class="mt-3"
        fxLayout="row wrap"
        fxLayout.lt-sm="column"
        fxLayoutGap="32px"
        fxLayoutAlign="flex-start"
      >
        <mat-form-field
          appearance="outline"
          fxFlex="0 1 calc(50% - 32px)"
          fxFlex.lt-md="0 1 calc(50% - 32px)"
          fxFlex.lt-sm="100%"
        >
          <mat-label>Employee</mat-label>
          <input
            type="number"
            matInput
            placeholder="Article Title"
            name="employee"
            formControlName="employee"
          />
          @if (form.controls['employee'].errors) {
            <mat-error>
              {{ form.controls['employee'].errors['error'] }}
            </mat-error>
          }
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          fxFlex="0 1 calc(50% - 32px)"
          fxFlex.lt-md="0 1 calc(50% - 32px)"
          fxFlex.lt-sm="100%"
        >
          <mat-label>Shift</mat-label>
          <input
            type="text"
            matInput
            placeholder="What's this article about?"
            name="shift"
            formControlName="shift"
          />
          @if (form.controls['shift'].errors) {
            <mat-error>
              {{ form.controls['shift'].errors['error'] }}
            </mat-error>
          }
        </mat-form-field>

        <!--mat-form-field
                appearance="outline"
                fxFlex="0 1 calc(100% - 32px)"
                fxFlex.lt-md="0 1 calc(100% - 32px)"
                fxFlex.lt-sm="100%">
                <input
                  type="text"
                  placeholder="Enter Location"
                  formControlName="attendance_day"
                  matInput
                  [matAutocomplete]="auto" />
                <mat-autocomplete #auto="matAutocomplete">
                  <mat-option *ngFor="let option of attendanceDays | async" [value]="option.name">
                    {{ option.name }}
                  </mat-option>
                </mat-autocomplete>
              </mat-form-field-->

        <mat-form-field class="col full-width">
          <mat-select placeholder="Attendance Day" formControlName="attendance_day">
            @for (day of attendanceDays; track day) {
              <mat-option [value]="day.id" [disabled]="day.disabled">
                {{ day.day }}
              </mat-option>
            }
          </mat-select>
          @if (form.controls['attendance_day'].errors) {
            <mat-error>
              {{ form.controls['attendance_day'].errors['error'] }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          fxFlex="0 1 calc(100% - 32px)"
          fxFlex.lt-md="0 1 calc(100% - 32px)"
          fxFlex.lt-sm="100%"
        >
          <mat-label>Additional Data</mat-label>
          <textarea
            rows="8"
            matInput
            placeholder="Write your article (in markdown)"
            name="requested_data"
            formControlName="requested_data"
          ></textarea>
        </mat-form-field>
        <!--fieldset class="form-group">
                  <input
                    #tagInput
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    (keydown.enter)="addTag(tagInput)" />
                  <div class="tag-list" *ngIf="articleFormData.tagList?.length">
                    <span class="tag-pill tag-default" *ngFor="let tag of articleFormData.tagList">
                      <i class="ion-close-round" (click)="removeTag(tag)"></i>
                      {{ ' ' + tag }}
                    </span>
                  </div>
                </fieldset-->
        <button
          fxFlex="0 1 calc(100% - 32px)"
          fxFlex.lt-md="0 1 calc(100% - 32px)"
          fxFlex.lt-sm="100%"
          mat-flat-button
          color="primary"
          type="button"
          class="p-3"
          style="padding: 10px; margin-right: 16px"
          [disabled]="form.invalid"
        >
          Save
        </button>
      </form>
    </xtra-form-layout>
  `,
  styles: [``],
  providers: [AttendanceService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceUpsertComponent implements OnInit {
  protected readonly service = inject(AttendanceService);
  fb = inject(FormBuilder);
  parent = inject(NgForm);
  form!: FormGroup;

  options = [];
  // attendanceDays?: Observable<IEmployeeShiftDay[]>;
  attendanceDays?: IEmployeeShiftDay[];
  attendance!: IAttendance;

  /** Name for the formGroup when added to the parent form. Defaults to 'attendance'. */
  formGroupName = 'attendance';

  set id(id: number) {
    this.service.getById(id);
  }

  constructor() {
    // private daysService: AttendanceDaysService
    // addValidatorsToControls(this.form.controls as any, attendanceSyncValidationSuite);
    /*this.attendanceDays = this.form.controls['attendance_day'].value.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: any) => {
        return this.filter(val || '');
      })
    );*/
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      employee: null,
      shift: null,
      attendance_day: null,
      requested_data: null,
    });

    // Add this reactive form to the parent form
    // See Kara's AngularConnect 2017 talk: https://youtu.be/CD_t3m2WMM8?t=2150
    // Wait a tick to bypass ExpressionChangedAfterItHasBeenCheckedError for `ng-valid`
    setTimeout(() => {
      this.parent.form.addControl(this.formGroupName, this.form);
      if (this.attendance) {
        // Populate controls
        this.form.setValue(this.attendance);
      }
    }, 1);
  }

  filter(val: string): Observable<any> {
    // return this.daysService.getData().pipe(
    //   map((response) =>
    //     response.filter((option: {name: string}) => {
    //       return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    //     }),
    //   ),
    // );
    return of();
  }

  onSubmit(form: FormGroup): void {
    this.service.create(form.value);
  }
}

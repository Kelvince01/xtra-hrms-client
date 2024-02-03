import {Component, Inject, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeesService} from '@services/employees.service';
import {IRecruitment, IStage} from '@models/recruitments.model';
import {IEmployeeInfo} from '@models/employee.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {RecruitmentsService, StagesService} from '@data/services/recruitments.service';
import {ErrorMessageComponent} from '@shared/components/error-message/error-message.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-stage-upsert',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ErrorMessageComponent,
  ],
  template: `
    <div class="panel">
      <h1 mat-dialog-title>Add Stage</h1>
      <form [formGroup]="stageForm" (ngSubmit)="onSubmit()" mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Recruitment:</mat-label>
          <mat-select formControlName="recruitment">
            @for (recruitment of recruitments(); track recruitment) {
              <mat-option [value]="recruitment.id">
                {{ recruitment.title }}
              </mat-option>
            }
          </mat-select>
          <mat-error xtra-error-message [control]="stageForm.get('recruitment')!"></mat-error>
        </mat-form-field>

        <!--mat-form-field appearance='fill'>
                <mat-label>Stage Managers:</mat-label>
                <mat-select formControlName='stage_managers'>
                  <mat-option *ngFor='let lot of stageManagers()' [value]='lot.id'>
                    {{lot.firstname}} {{lot.lastname}}
                  </mat-option>
                </mat-select>
                <mat-error app-error-message [control]="stageForm.get('stage_managers')!"></mat-error>
              </mat-form-field-->

        <mat-form-field appearance="fill">
          <mat-label>Stage Managers:</mat-label>
          <mat-select formControlName="stage_managers" multiple>
            <mat-select-trigger>
              {{ stageForm.get('stage_managers')!.value?.[0] || '' }}
              @if ((stageForm.get('stage_managers')!.value?.length || 0) > 1) {
                <span class="additional-selection">
                  (+{{ (stageForm.get('stage_managers')!.value?.length || 0) - 1 }}
                  {{ stageForm.get('stage_managers')!.value?.length === 2 ? 'other' : 'others' }}
                  )
                </span>
              }
            </mat-select-trigger>
            @for (manager of stageManagers(); track manager) {
              <mat-option [value]="manager.id">
                {{ manager.firstname }} {{ manager.lastname }} - ({{ manager.email }})
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Stage:</mat-label>
          <input matInput type="text" formControlName="stage" />
          <mat-error xtra-error-message [control]="stageForm.get('stage')!"></mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Stage Type:</mat-label>
          <mat-select formControlName="stage_type">
            <mat-option value="initial">Initial</mat-option>
            <mat-option value="test">Test</mat-option>
            <mat-option value="interview">Interview</mat-option>
            <mat-option value="hired">Hired</mat-option>
          </mat-select>
          <mat-error xtra-error-message [control]="stageForm.get('stage_type')!"></mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="always">
          <mat-label>Sequence</mat-label>
          <input matInput type="number" placeholder="0" formControlName="sequence" />
        </mat-form-field>

        <section>
          <mat-checkbox class="mx-0 my-2" formControlName="is_active">Active</mat-checkbox>
          <mat-error xtra-error-message [control]="stageForm.get('is_active')!"></mat-error>
        </section>

        <div mat-dialog-actions>
          <button type="reset" mat-button (click)="onNoClick()">Cancel</button>
          @if (!isEdit) {
            <button type="submit" mat-raised-button color="primary" [disabled]="!stageForm.valid">
              Save
            </button>
          }
          @if (isEdit) {
            <button type="submit" mat-raised-button color="primary" [disabled]="!stageForm.valid">
              Edit
            </button>
          }
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        display: block;
        min-width: 350px;
      }

      .additional-selection {
        opacity: 0.75;
        font-size: 0.75em;
      }
    `,
  ],
  providers: [StagesService, RecruitmentsService, EmployeesService],
})
export class StageUpsertComponent implements OnInit {
  stageForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<StageUpsertComponent>);
  recruitments = signal<IRecruitment[]>([]);
  stageManagers = signal<IEmployeeInfo[]>([]);

  service = inject(StagesService);
  recruitmentService = inject(RecruitmentsService);
  employeeService = inject(EmployeesService);
  toastr = inject(ToastrService);
  readonly #router = inject(Router);
  isEdit: boolean = false;
  id: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IStage,
    service: StagesService,
  ) {
    this.stageForm = this.fb.group({
      recruitment: [null, Validators.required],
      stage_managers: [null, Validators.required],
      stage: ['', Validators.required],
      stage_type: ['', [Validators.required]],
      sequence: [null, [Validators.required]],
      is_active: ['', [Validators.required]],
    });

    if (data) {
      this.isEdit = true;
      this.id = data.id!;

      this.service.getById(data.id!);

      this.stageForm.patchValue({
        // ...this.service.object
      });
    }
  }

  ngOnInit(): void {
    this.recruitmentService.getPaginated().subscribe((res) => {
      this.recruitments.set(res.results);
    });
    this.employeeService.get().subscribe((res) => {
      this.stageManagers.set(res);
    });
  }

  onSubmit(): void {
    if (this.stageForm.valid) {
      const stage: IStage = {
        recruitment: this.stageForm.controls['recruitment'].value,
        // stage_managers: (this.stageForm.controls['stage_managers'].value).map(s => s.id),
        stage_managers: this.stageForm.controls['stage_managers'].value,
        stage: this.stageForm.get('stage')!.value,
        stage_type: this.stageForm.controls['stage_type'].value,
        sequence: this.stageForm.controls['sequence'].value.toString(),
        is_active: this.stageForm.controls['is_active'].value,
      };

      if (!this.isEdit) {
        this.service.create(stage);
        // this.#router.navigate(['/admin', 'companies', 'branches']);
        this.dialogRef.close();
      } else {
        this.service.update(stage);
        this.dialogRef.close();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

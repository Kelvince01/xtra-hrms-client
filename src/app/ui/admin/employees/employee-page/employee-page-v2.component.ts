import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '@data/models';
import { EmployeesService, PermissionsService } from '@data/services';

export type EmployeeForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  position: FormControl<string>;
  level: FormControl<string>;
};

@Component({
  selector: 'xtra-employee-page-v2',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Edit Employee</h2>
    <input type="text" placeholder="First Name" [formControl]="form.controls.email" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageV2Component implements OnInit {
  private readonly employeeService = inject(EmployeesService);
  permissionsService = inject(PermissionsService);
  destroyRef = inject(DestroyRef);

  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    position: new FormControl('', { nonNullable: true }),
    level: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    this.permissionsService
      .hasPermission('EditEmployeePrivateDetails')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(hasPermission => {
        if (!hasPermission) {
          this.form.controls.firstName.disable();
          this.form.controls.lastName.disable();
          this.form.controls.email.disable();
        } else {
          this.form.controls.firstName.enable();
          this.form.controls.lastName.enable();
          this.form.controls.email.enable();
        }
      });
  }

  submit() {
    if (this.form.valid) {
      const employee = this.form.value as IEmployee;
      this.employeeService.create(employee);
    }
  }
}

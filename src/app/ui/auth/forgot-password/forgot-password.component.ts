import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@data/services';
import { ToastrService } from 'ngx-toastr';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'xtra-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, MatInputModule, MatButton],
  template: `
    <div class="card">
      <h4 class="card-header">Forgot Password</h4>
      <div class="card-body">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field class="mb-3">
            <mat-label>Email</mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              [ngClass]="{ 'is-invalid': submitted && f['email'].errors }" />
            @if (submitted && f['email'].errors) {
              <div class="invalid-feedback">
                @if (f['email']['errors']['required']) {
                  <div>Email is required</div>
                }
                @if (f['email']['errors']['email']) {
                  <div>Enter Valid Email</div>
                }
              </div>
            }
          </mat-form-field>
          <div>
            <button mat-button [disabled]="loading || !form.valid" class="mb-3">
              @if (loading) {
                <span class="spinner-border spinner-border-sm me-1"></span>
              }
              Submit
            </button>
            <a routerLink="/accounts/sign-in" class="mt-3">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.toastr.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .forgotPassword({
        email: this.f['email'].value,
      })
      .pipe(first())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.toastr.show('Please check your email for password reset instructions'),
        error: error => this.toastr.error('error', error),
      });
  }
}

import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {LeaveRequestsService} from '@services/lms.service';
import {ILeaveRequest} from '@models/lms.model';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'xtra-leave-request-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h4>{{ title }}</h4>

    <form #form="ngForm">
      <label for="accountNumber">Account Number</label>
      <input name="accountNumber" [disabled]="!inEditMode" [(ngModel)]="entity.description" />

      <label for="balance">Balance</label>
      <input name="balance" [disabled]="!inEditMode" [(ngModel)]="entity.status" />

      <!--label for="active">Active</label>
      <input
        name="active"
        type="checkbox"
        [disabled]="!inEditMode"
        [value]="entity.active"
        [ngModel]="entity.active"
        (ngModelChange)="entity.active = $event" /-->
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 10px;
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      h4 {
        -webkit-text-fill-color: #0000;
        background-clip: text;
        -webkit-background-clip: text;
        background-image: linear-gradient(
          to right,
          #761fac 0,
          #8a19a9 20%,
          #d900a5 70%,
          #d917a3 100%
        );
        filter: drop-shadow(0 1px 0 #fff);
        font-weight: 800;
        color: #69f5ff;
        text-decoration: underline;
      }
    `,
  ],
  providers: [LeaveRequestsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveRequestItemComponent implements OnInit {
  title = 'Leave Requests';

  constructor(
    private entityService: LeaveRequestsService,
    public route: ActivatedRoute,
  ) {}

  @Input()
  inEditMode: boolean = false;

  form!: NgForm;
  id: number = 0;
  loading = false;
  submitted = false;

  entity!: ILeaveRequest;

  unchangedEntity!: ILeaveRequest;
  defaultEntity!: ILeaveRequest;
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadEntity();
  }

  loadEntity(): void {
    if (this.id) {
      this.entityService.getById(this.id).subscribe((entity) => {
        this.entity = entity ?? this.defaultEntity;
      });
    } else {
      this.entity = {} as ILeaveRequest;
    }
    this.unchangedEntity = {...this.entity};
  }

  save(): void {
    if (this.form.dirty) {
      this.entityService.create(this.entity);

      /*this.router.navigate(['/admin/hrm/users'], {
              relativeTo: this.route,
            });*/

      this.unchangedEntity = {...this.entity};
    }
  }

  cancel(): void {
    this.entity = {...this.unchangedEntity};
  }
}

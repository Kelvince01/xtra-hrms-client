import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IRole, IUser} from '@data/models/accounts.model';
import {AuthService} from '@data/services';
import {RolesService} from '@data/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'xtra-role-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  template: `
    <h3>New Role</h3>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form #form="ngForm" action="" (ngSubmit)="onSubmit(form)">
            <mat-form-field>
              <input
                [(ngModel)]="formData.name"
                matInput
                placeholder="Role"
                name="role"
                id="role"
                required
                type="text"
              />
              <mat-error>Required</mat-error>
              <mat-hint>Please enter a one word eg-creditor or seperated by space</mat-hint>
            </mat-form-field>
            @if (dropdownRoles.length) {
              <div>
                <mat-slide-toggle title="toogle to see options" [(ngModel)]="level" name="level">
                  check to see user role levels
                </mat-slide-toggle>
                <br />
                <mat-hint>
                  If unchecked role level will be created automatically by the system
                </mat-hint>

                <!-- level -->
                @if (level) {
                  <mat-form-field>
                    <mat-label>Select Level</mat-label>
                    <mat-select
                      #matSelect
                      name="user_category"
                      [(ngModel)]="formData.user_category"
                    >
                      @for (level of dropdownRoles; track level) {
                        <mat-option [value]="level.user_category">
                          {{ level.user_category }}--({{ level.role }})
                        </mat-option>
                      }
                    </mat-select>
                  </mat-form-field>
                }
              </div>
            }

            <!-- descri -->
            <mat-form-field>
              <mat-label>Description</mat-label>
              <textarea
                [(ngModel)]="formData.description"
                matInput
                placeholder="Description"
                name="description"
                id="description"
                required
                type="text"
                cols="20"
                rows="5"
              ></textarea>
              <mat-error>Required</mat-error>
              <mat-hint>Role Description</mat-hint>
            </mat-form-field>

            @if (isHost) {
              <div>
                <mat-slide-toggle
                  [(ngModel)]="isClient"
                  title="toogle to see options"
                  name="client"
                  [checked]="isClient"
                >
                  create for client
                </mat-slide-toggle>
                <br />
                <mat-hint>Check to create role for a client</mat-hint>
              </div>
            }
            @if (isHost && isClient) {
              <mat-form-field>
                <mat-label>Select Client</mat-label>
                <mat-select
                  #matSelect
                  name="client_id"
                  [(ngModel)]="formData.client_id"
                  [multiple]="true"
                >
                  <mat-checkbox class="mat-option" (change)="selectAll($event, matSelect)">
                    select all
                  </mat-checkbox>
                  @for (client of clients; track client) {
                    <mat-option [value]="client.id">{{ client.name }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            }
            <div>
              <button mat-stroked-button color="primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        width: 52%;
      }
    `,
  ],
  providers: [RolesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolePageComponent implements OnInit {
  formData: IRole = {
    permissions: [],
    groups: [],
    id: 0,
    name: '',
    client_id: 0,
    description: '',
    user_category: 0,
  };
  isClient: boolean = false;

  currentUser!: IUser;
  roles!: Array<IRole>;

  clients: any[] = [];
  isHost: boolean = false;
  level: boolean = false;
  dropdownRoles: any[] = [];

  snackbar = inject(MatSnackBar);
  toastr = inject(ToastrService);
  roleService = inject(RolesService);
  authService = inject(AuthService);

  constructor() {} // private dataService: DataService, // private sharedService: SharedService, // private uamCommon: UamCommonService, // private uam: UserActionManagementService, // private alert: AlertService,

  ngOnInit(): void {
    // this.currentUser = this.authService.user(); // current authenticated user
    // this.isHost = this.uamCommon.isHost(this.currentUser);
    // be minimalistic call clients only if user is not a client
    // this.isHost ? this.getClients() : null;
    // this.getUserIndivualRoles(this.currentUser.id);
  }

  // submit form
  onSubmit(form: NgForm): void {
    if (form.valid) {
      try {
        this.formData.name = this.validateInput(form.value.role);
        this.mapData(this.currentUser as any);
        this.roleService.create(this.formData);
      } catch (error) {
        this.toastr.error('This action could not be completed at this moment');
      }
    }
  }

  validateInput(role: string): string {
    //replaces all white space to a single white space
    const newRole: string = role.replace(/\s\s+/g, ' ');

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const capitalize = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    /*
      @desc
        return and camel case string or join with _
    */
    const length: number = newRole.length;
    if (length >= 20) {
      return newRole.replace(' ', '_');
    }
    const stringArr: Array<string> = newRole.split(' ');
    const _string = stringArr.map((string, index) => {
      let vString = string;
      if (index > 0) {
        vString = capitalize(string);
      }
      return vString;
    });
    return _string.join('');
  }

  mapData({client_id}: any): void {
    if (!this.isHost) {
      this.formData.client_id = client_id;
    } else {
      //host creating a role
      this.formData.client_id = this.formData.client_id ? this.formData.client_id : client_id;
    }
  }

  selectAll(event: MatCheckboxChange, selection: MatSelect): void {
    event.checked
      ? selection.options.forEach((option: MatOption) => option.select())
      : selection.options.forEach((option: MatOption) => option.deselect());
  }
}

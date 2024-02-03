import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionsService} from '@data/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'xtra-permission-assign',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <h3>Assign Permission</h3>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <mat-card>
            <div class="entity-selections">
              <mat-form-field class="role-selection">
                <mat-label>Select Role</mat-label>
                <mat-select
                  name="role"
                  [(ngModel)]="permissionData.role_id"
                  (selectionChange)="filterPermissions($event)"
                >
                  @for (role of roles; track role) {
                    <mat-option [value]="role.id">{{ role.role }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>
            <div class="permissions">
              <div class="row">
                <div class="col-4">
                  <div class="perms-list">
                    <div class="list-group" id="list-tab" role="tablist">
                      @for (actionCat of actionCategories; track actionCat) {
                        <a
                          (click)="selectActions(actionCat.actions); showSideActions = true"
                          class="list-group-item list-group-item-action"
                          [id]="actionCat.id"
                          data-toggle="list"
                          href="#list-home"
                          role="tab"
                          aria-controls="home"
                        >
                          {{ actionCat.name }}
                        </a>
                      }
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="list-home"
                      role="tabpanel"
                      aria-labelledby="list-home-list"
                    >
                      <div class="actions">
                        <div class="container">
                          <div class="row">
                            @for (action of actions; track action) {
                              <div class="col-md-6">
                                <mat-checkbox [name]="action.id" [(ngModel)]="action.checked">
                                  {{ action.name }}
                                </mat-checkbox>
                              </div>
                            }
                            @if (!actions.length && showSideActions) {
                              <div class="col-md-8 alert alert-warning">
                                <div class="no-actions">
                                  <mat-icon>info</mat-icon>
                                  No actions at the moment
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      @if (actions.length) {
                        <div class="sub-btn">
                          <button color="primary" (click)="updateRoleActions()" mat-stroked-button>
                            Update
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  providers: [PermissionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionAssignComponent {
  permissionData = {
    role_id: null,
  };
  submitting: boolean = false;
  actionCategories: any[] = [];
  actions: any[] = [];
  roles: any[] = [];
  permissions: any[] = [];
  showSideActions: boolean = true;
  allEntityPerms: any[] = [];
  actionsCopy: any;

  permissionsService = inject(PermissionsService);
  toastr = inject(ToastrService);

  getPermissions(query: any): void {
    this.permissionsService.get(query).subscribe((objs) => {
      this.permissions = objs;
    });
  }

  filterPermissions(event: MatSelectChange): void {
    const roleId: number = event.value;
    const query = {
      role_id: roleId,
    };
    this.getPermissions(query);
    // this.getActionCategory();
    // this.getEntityActions(roleId);
  }

  selectActions(actions: any[]): void {
    if (actions.length) {
      const entityActions = actions.filter((element) =>
        this.allEntityPerms.find((data) => data.action_id === element.id),
      );
      this.actions = this.addCheckStatus(entityActions, this.permissions);
      //make a copy
      this.actionsCopy = JSON.parse(JSON.stringify(this.actions));
    }
  }

  addCheckStatus(actions: any[], roleActions: any[]): {id: any; name: any; checked: boolean}[] {
    return actions.map((action) => ({
      id: action.id,
      name: action.name,
      checked: roleActions.filter((x) => x.action_id === action.id).length > 0,
    }));
  }

  updateRoleActions(): void {
    const updateRoles: any[] = this.checkRolePermsChange(this.actionsCopy, this.actions);
    const permsToRemove: any[] = updateRoles.filter((r) => r.checked === false);
    const permsToAdd: any[] = updateRoles.filter((r) => r.checked === true);
    if (permsToAdd.length === 0 && permsToRemove.length === 0) {
      this.toastr.error('Please select an action(s)');
    }
    if (permsToAdd.length !== 0) {
      this.addRolePerms(permsToAdd);
    }
    if (permsToRemove.length !== 0) {
      this.removeRolePerms(permsToRemove);
    }
  }

  checkRolePermsChange(original: any[], edited: any[]): any[] {
    return edited.filter((oRole) => {
      return original.find((eRole) => oRole.id === eRole.id && eRole.checked !== oRole.checked);
    });
  }

  private addRolePerms(perms: any[]): void {
    if (!perms.length || !this.permissionData.role_id) return;
    this.submitting = true;
    const data: any[] = [];
    perms.forEach((perm) => {
      const userRole = {
        role_id: this.permissionData.role_id,
        action_id: perm.id,
      };
      data.push(userRole);
    });
    this.permissionsService.createMany(data);
    this.submitting = false;
  }

  private removeRolePerms(actions: any[]): void {
    if (!actions.length || !this.permissionData.role_id) return;
    this.submitting = true;
    const actionIds = actions.map((action) => action.id);
    const query: any = {
      role_id: this.permissionData.role_id,
      action_id: {
        $in: actionIds,
      },
    };

    this.permissionsService.deleteMany(query);
    this.submitting = false;
  }
}

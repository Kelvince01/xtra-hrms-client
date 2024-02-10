import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {employeeListQuery} from '@stores/employees';
import {employeeListActions} from '@stores/employees';
import {EmployeeListItemComponent} from './employee-list-item/employee-list-item.component';
import {AsyncPipe} from '@angular/common';
import {PagerComponent} from '@shared/components';
import {EmployeeStore} from '@stores/employees';

@Component({
  selector: 'xtra-employee-list',
  standalone: true,
  imports: [EmployeeListItemComponent, AsyncPipe, PagerComponent],
  template: `
    @if (!(isLoading$ | async)) {
      @for (employee of employees$ | async; track employee.id) {
        <xtra-employee-list-item
          data-e2e-id="employee-list"
          [employee]="employee"
        ></xtra-employee-list-item>
      } @empty {
        <div>No employees are here... yet.</div>
      }

      <xtra-pager
        (setPage)="setPage($event)"
        [currentPage]="(listConfig$ | async)?.currentPage"
        [totalPages]="totalPages$ | async"
      ></xtra-pager>
    } @else {
      <div>Loading employees...</div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly employeeStore = inject(EmployeeStore);

  totalPages$ = this.store.select(employeeListQuery.selectTotalPages);
  employees$ = this.store.select(employeeListQuery.selectEmployeeEntities);
  listConfig$ = this.store.select(employeeListQuery.selectListConfig);
  isLoading$ = this.store.select(employeeListQuery.isLoading);

  navigateToArticle(slug: string) {
    this.router.navigate(['/employee', slug]);
  }

  setPage(page: number) {
    this.store.dispatch(employeeListActions.setListPage({page}));
  }

  delete(id: number) {
    this.employeeStore.deleteEmployee(id);
  }
}

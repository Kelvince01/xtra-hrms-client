import {AfterViewInit, Directive, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortable, Sort} from '@angular/material/sort';
import {interval, Subscription} from 'rxjs';

@Directive({
  selector: '[xtraNgMatTableQueryReflector]',
  standalone: true,
})
export class NgMatTableQueryReflectorDirective implements AfterViewInit {
  @Input() dataSource?: MatTableDataSource<any>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.initialSetup();
    this.listenToStateChangeEvents();
  }

  private async initialSetup(): Promise<void> {
    // HACK 1
    await this.waitForQueryParamsToLoad();

    const activeSortQuery = this.activeSortQuery;
    if (!activeSortQuery) {
      return;
    }

    const sortable: MatSortable = {
      id: activeSortQuery.sort_active,
      start: activeSortQuery.sort_direction,
      disableClear: true,
    };

    this.dataSource?.sort?.sort(sortable);

    // HACK 2
    const activeSortHeader = this.dataSource?.sort?.sortables.get(activeSortQuery.sort_active);
    (activeSortHeader as any)['_setAnimationTransitionState']({
      fromState: this.dataSource?.sort?.direction,
      toState: 'active',
    });
  }

  private get activeSortQuery(): {
    sort_active: string;
    sort_direction: 'asc' | 'desc';
  } {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (
      Object.prototype.hasOwnProperty.call(queryParams, 'sort_active') &&
      Object.prototype.hasOwnProperty.call(queryParams, 'sort_direction')
    ) {
      return {
        sort_active: queryParams['sort_active'],
        sort_direction: queryParams['sort_direction'],
      };
    }
    return null as any;
  }

  private waitForQueryParamsToLoad(): Promise<void> {
    if (!window.location.search) {
      return null as any;
    }

    const titleCheckingInterval$ = interval(500);
    let subscription: Subscription;

    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      subscription = titleCheckingInterval$.subscribe((val) => {
        if (Object.values(this._activatedRoute.snapshot.queryParams).length > 0) {
          subscription.unsubscribe();
          return resolve();
        }
      });
    });
  }

  private listenToStateChangeEvents(): void {
    this.dataSource?.sort?.sortChange.subscribe((sortChange: Sort) => {
      this._applySortChangesToUrlQueryParams(sortChange);
    });
  }

  private _applySortChangesToUrlQueryParams(sortChange: Sort): void {
    const sortingAndPaginationQueryParams = {
      sort_active: sortChange.active,
      sort_direction: sortChange.direction,
    };
    this._router.navigate([], {
      queryParams: sortingAndPaginationQueryParams,
      queryParamsHandling: 'merge',
    });
  }
}

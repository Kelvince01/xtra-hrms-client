export default `
<ng-container>
<xtra-breadcrumbs [items]="breadcrumbs"></xtra-breadcrumbs>
      <mat-toolbar>
        <mat-toolbar-row class="flex-row">
          <span class="title basis-[100px]">{{ title }}</span>
          @if (!newButtonHidden) {
            <button class="right-2" mat-raised-button color="primary" (click)="add()">
              {{ 'common.new-button' | translate }}
            </button>
          }
          <!--button
            class="right-2"
            *ngIf="!newButtonHidden"
            mat-raised-button
            color="primary"
            (click)="emitAddNewAction()">
            {{ 'common.new-button' | translate }}
          </button-->

          <!--button
            *ngIf="displayCreateAction"
            (click)="performAction(userActions.Add, {})"
            matTooltipClass="tooltip"
            matTooltipPosition="left"
            [matTooltip]="addRowText"
            mat-flat-button
            color="primary"
            style="float:right">
            <mat-icon>add</mat-icon>
          </button-->
        </mat-toolbar-row>
      </mat-toolbar>

      @if (isLoading()) {
        <div
          style="display: flex; justify-content: center;
           align-items: center; background: white;"
        >
          <mat-progress-bar color="primary" mode="indeterminate"></mat-progress-bar>
        </div>
      }

      <!-- Table -->
      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        (matSortChange)="sortTable($event)"
        xtraNgMatTableQueryReflector
        (scroll)="onTableScroll($event)"
        class="table-container mat-elevation-z8"
      >
        @for (tableColumn of displayTableColumns; track tableColumn) {
          <ng-container [matColumnDef]="tableColumn.name">
            <!-- if sortable column header -->
            @if (tableColumn.isSortable) {
              <th
                mat-header-cell
                *matHeaderCellDef
                [mat-sort-header]="tableColumn.name"
                [arrowPosition]="tableColumn.position === 'right' ? 'before' : 'after'"
              >
                {{ tableColumn.name }}
              </th>
            } @else {
              <th
                mat-header-cell
                *matHeaderCellDef
                [class.text-right]="tableColumn.position === 'right'"
              >
                {{ tableColumn.name }}
              </th>
            }
            <!-- else not sortable -->

            <!-- column data -->
            <td
              mat-cell
              *matCellDef="let element"
              [class.text-right]="tableColumn.position === 'right'"
            >
              {{ element | dataPropertyGetter: tableColumn.dataKey! }}
            </td>
          </ng-container>
        }

        <!-- first header row -->
        <ng-container matColumnDef="header-row-first-group">
          <th mat-header-cell *matHeaderCellDef [attr.colspan]="6">
            <div class="flex justify-between items-center">
              <div>
                <!-- Filter -->
                @if (isFilterable) {
                  <ng-container [matColumnDef]="this.rowFilterAction">
                    <mat-form-field>
                      <mat-label>Filter</mat-label>
                      <!--                    <mat-icon [ngStyle]="{'color': '#88ACC1'}">search</mat-icon>-->
                      <input
                        matInput
                        (keyup)="applyFilter($event)"
                        placeholder="filter"
                        #input
                        type="text"
                        name="search"
                      />
                    </mat-form-field>
                  </ng-container>
                }
              </div>
              <div class="space-x-2 pr-20 ">
                <button mat-button>
                  <mat-icon class="mat-icon-size">tune</mat-icon>
                </button>
                @if (!exportButtonHidden) {
                  <button
                    class="right-2 export-button"
                    mat-raised-button
                    color="primary"
                    (click)="exportPdf()"
                  >
                    <mat-icon class="mat-icon-size">save_alt</mat-icon>
                    {{ 'common.export-button' | translate }}
                  </button>
                }
                <button mat-flat-button>
                  <mat-icon class="mat-icon-size">print</mat-icon>
                </button>
              </div>
            </div>
          </th>
        </ng-container>

        <!-- action column
              <ng-container *ngIf='rowActionIcon?.length' [matColumnDef]='rowActionIcon'>
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef='let element' [id]='rowActionIcon' (click)='emitRowAction(element)'>
                  <button mat-button>
                    <mat-icon>{{rowActionIcon}}</mat-icon>
                  </button>
                </td>
              </ng-container> -->

        <!-- Menu Column -->
        @if (displayedColumns().includes('menu')) {
          <ng-container matColumnDef="menu">
            <th mat-header-cell *matHeaderCellDef>{{ 'common.caption.actions' | translate }}</th>
            <td
              mat-cell
              *matCellDef="let element"
              [attr.data-label]="'common.caption.actions' | translate"
            >
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="edit(element.id)">
                  <mat-icon>edit</mat-icon>
                  <span>{{ 'common.menu.edit' | translate }}</span>
                </button>
                <button mat-menu-item (click)="delete(element)">
                  <mat-icon>delete</mat-icon>
                  <span>{{ 'common.menu.remove' | translate }}</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="['header-row-first-group']"></tr>
        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
      </table>

      <ng-template #success>
        <div class="flex items-center space-x-1">
          <mat-icon class="mat-icon-size" color="primary">check</mat-icon>
          <span>{{ 200 }}</span>
        </div>
      </ng-template>

      <ng-template #failed>
        <div class="flex items-center space-x-1">
          <mat-icon class="text-customGreyColor mat-icon-size">error_outline</mat-icon>
          <span>{{ 400 }}</span>
        </div>
      </ng-template>

      <!-- No Data -->
      @if (dataSource.data.length === 0) {
        <div>No Records Found!</div>
      }

      <!-- Pagination -->
      @if (isPageable) {
        <mat-paginator
          [pageSizeOptions]="pageSizeOptions"
          [pageSize]="defaultPageSize"
          (page)="onPageChange($event)"
          [showFirstLastButtons]="true"
          #paginator
          [length]="totalRows"
          [pageIndex]="currentPage"
          aria-label="Select page"
        ></mat-paginator>
      }
    </ng-container>
`;

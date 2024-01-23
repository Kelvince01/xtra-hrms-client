import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectHasPermission} from "../../data/store/permissions/permission.selector";

@Directive({
  selector: '[xtraHasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  @Input("xtraHasPermission") permission!: string;
  destroy$ = new Subject<void>();

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store
      .select(selectHasPermission(this.permission))
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasPermission) => {
        if (hasPermission) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}

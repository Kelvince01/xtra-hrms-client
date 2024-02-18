import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

/**
 * This component template wraps the projected content
 * with a 'cdkPortal'.
 */

@Component({
  selector: 'xtra-window',
  standalone: true,
  template: `
    <ng-container *cdkPortal>
      <ng-content></ng-content>
    </ng-container>
  `,
  imports: [CdkPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent implements AfterViewInit, OnDestroy {
  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal)
  public portal!: CdkPortal;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow: any = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngAfterViewInit(): void {
    // STEP 4: create an external window
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

    // STEP 5: create a PortalHost with the body of the new window document
    const host = new DomPortalOutlet(
      this.externalWindow.document.body,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector,
    );

    // STEP 6: Attach the portal
    // Attach portal to host
    setTimeout(() => host.attach(this.portal));
  }

  ngOnDestroy(): void {
    // STEP 7: close the window when this component destroyed
    this.externalWindow.close();
  }
}

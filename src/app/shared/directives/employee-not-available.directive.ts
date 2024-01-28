import {NgClass} from '@angular/common';
import {AfterViewInit, Directive, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TooltipDirective} from './tooltip.directive';
import {EmployeesService} from '@data/services';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'a[routerLink]',
  hostDirectives: [NgClass, {directive: TooltipDirective, inputs: ['tooltip']}],
  standalone: true,
})
export class EmployeeNotAvailableDirective implements AfterViewInit {
  private readonly ngClassRef = inject(NgClass);
  private readonly routerLinkRef = inject(RouterLink);
  private readonly employeeService = inject(EmployeesService);
  private readonly tooltipRef = inject(TooltipDirective);

  ngAfterViewInit() {
    if (this.routerLinkRef.href!.startsWith('/employees/details')) {
      const employeeId =
        this.routerLinkRef.urlTree?.root.children['primary']?.segments.at(-1)?.path;

      if (employeeId) {
        this.employeeService.getById(+employeeId).subscribe((employee) => {
          this.ngClassRef.ngClass = {'not-available': !employee.is_available};
          this.tooltipRef.tooltip = employee.is_available ? '' : 'Employee is not available';
        });
      }
    }
  }
}

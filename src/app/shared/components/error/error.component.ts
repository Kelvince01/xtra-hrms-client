import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SimplePageComponent} from '@shared/components/simple-page/simple-page.component';

@Component({
  selector: 'xtra-error',
  standalone: true,
  imports: [SimplePageComponent],
  template: `
    <xtra-simple-page
      title="An error occurred"
      subtitle="There was a problem fetching your page"
      buttonText="GO TO HOME"
      icon="report"
      [centerText]="true"
      route="/"
    ></xtra-simple-page>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}

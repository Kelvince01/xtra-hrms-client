import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-asset-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      asset-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPageComponent {

}

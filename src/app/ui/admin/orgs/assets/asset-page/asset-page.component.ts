import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AssetService} from '@services/assets.service';

@Component({
  selector: 'xtra-asset-page',
  standalone: true,
  imports: [],
  template: `
    <p>asset-page works!</p>
  `,
  styles: ``,
  providers: [AssetService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetPageComponent {}

import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'xtra-snow',
  standalone: true,
  imports: [],
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowComponent {}

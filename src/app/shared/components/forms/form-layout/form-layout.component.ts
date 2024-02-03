import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'xtra-form-layout',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatDivider, MatCardContent],
  template: `
    <div class="container mx-auto px-4">
      <div class="columns-1">
        <div [class]="innerClass">
          <mat-card class="form-card">
            <mat-card-title>{{ title }}</mat-card-title>
            <mat-divider></mat-divider>
            <mat-card-content>
              <ng-content />
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-card {
        min-width: 500px;
        margin: 2em auto;
        text-align: center;
      }

      mat-form-field {
        display: block;
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {'[style.display]': "'block'"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLayoutComponent {
  @Input() innerClass = '';
  @Input() title = '';
}

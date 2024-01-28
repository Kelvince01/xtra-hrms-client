import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

export type DialogData = {
  title: string;
  text: string;
};

/*
export class AppComponent {
  public confirmed: boolean = false;

  @Confirmable() // <-- Here it is!
  public doSomething(): void {
    this.confirmed = true;
  }
}
 */
@Component({
  selector: 'xtra-simple-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.text }}
    </div>
    <div mat-dialog-actions>
      <button [mat-dialog-close]="false" mat-button>Cancel</button>
      <button [mat-dialog-close]="true" mat-button>Ok</button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { SvgIconComponent } from '@shared/components/svgs/svg-icon/svg-icon.component';

@Component({
  selector: 'xtra-input',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, SvgIconComponent, MatIcon],
  template: `
    <div [ngClass]="['input-container', containerClassName]">
      @if (icon) {
        <div class="input-icon-container" [style.width.px]="iconContainerWidth">
          <xtra-svg-icon [name]="icon" [size]="iconSize"></xtra-svg-icon>
        </div>
      }

      <input
        [formControl]="control"
        [placeholder]="placeholder"
        [ngClass]="['input', 'form-input']"
        [style.padding-left.px]="icon ? iconContainerWidth : 0"
        [style.padding-right.px]="isShowClearButton ? iconContainerWidth : 0" />

      @if (isShowClearButton) {
        <div class="input-icon-container right" [style.width.px]="iconContainerWidth">
          <!--        <i nz-icon nzType="close" nzTheme="outline" (click)="clear()"></i>-->
          <mat-icon (click)="clear()">close</mat-icon>
        </div>
      }
    </div>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() containerClassName = '';
  @Input() icon: string = '';
  @Input() iconSize = 16;
  @Input() placeholder = '';
  @Input() enableClearButton: boolean = true;

  get iconContainerWidth(): number {
    return this.iconSize * 2;
  }

  get isShowClearButton(): boolean {
    return this.enableClearButton && this.control?.value;
  }

  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
  }

  clear() {
    this.control.patchValue('');
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { BanksService } from '@data/services/finance.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'xtra-bank-upsert',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, MatGridListModule, MatInputModule],
  template: `
    <p>Test</p>
    <!--    <xtra-base-page [saveButtonDisabled]="vm.form?.invalid" (save)="vm.save()">-->
    <!--      <span title>{{ 'banks.bank-page' | translate }}</span>-->
    <!--      <span sub-title>{{ vm.subTitle$ | async }}</span>-->
    <form [formGroup]="form">
      <mat-grid-list rowHeight="64px">
        <!--      [cols]="vm.isMobile ? 1 : 2"-->
        <!--mat-grid-tile>
        <mat-form-field>
          <input
            matInput
            [placeholder]="'banks.caption.number' | translate"
            formControlName="number" />
        </mat-form-field>
      </mat-grid-tile-->

        <mat-grid-tile>
          <mat-form-field appearance="outline">
            <input
              matInput
              [placeholder]="'banks.caption.name' | translate"
              formControlName="name" />
          </mat-form-field>
        </mat-grid-tile>

        <!--mat-grid-tile>
            <app-drop-down-control
              formControlName="type"
              propertyName="type"></app-drop-down-control>
          </mat-grid-tile-->

        <!--mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'banks.caption.phone' | translate"
                formControlName="phone" />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'banks.caption.email' | translate"
                formControlName="email" />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field>
              <input
                matInput
                [placeholder]="'banks.caption.address' | translate"
                formControlName="address" />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile [colspan]="vm.isMobile ? null : 2">
            <mat-form-field style="width: 100%; padding: 3p 0 3px 0">
              <input
                matInput
                [placeholder]="'banks.caption.notes' | translate"
                formControlName="notes" />
            </mat-form-field>
          </mat-grid-tile-->
      </mat-grid-list>
    </form>
    <!--    </xtra-base-page>-->
    <!--    </mat-grid-list>-->
  `,
  styles: [``],
  providers: [BanksService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankUpsertComponent implements OnInit, OnDestroy {
  constructor(public service: BanksService) {}
  form!: FormGroup;

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}

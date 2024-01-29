import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {WindowService} from '@shared/services';

@Component({
  selector: 'xtra-lang',
  standalone: true,
  imports: [MatSelect, ReactiveFormsModule, MatOption, NgForOf],
  template: `
    <div class="lang-control">
      <mat-select [formControl]="langControl">
        <mat-option *ngFor="let lang of langs" [value]="lang.value">{{ lang.title }}</mat-option>
      </mat-select>
    </div>
  `,
  styles: [
    `
      .lang-control {
        width: 72px;
        font-size: medium;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangComponent {
  #translateService = inject(TranslateService);
  #windowService = inject(WindowService);

  langs: Array<{title: string; value: string}> = [
    {title: 'EN', value: 'en-US'},
    {title: 'UA', value: 'ua-UK'},
    {title: 'RU', value: 'ru-RU'},
  ];
  langControl = new FormControl();

  constructor() {
    this.setUpLang();
  }

  setUpLang() {
    let lang = 'en-US';
    if (localStorage) {
      const prefLang = this.#windowService.getLocalStorage('lang');
      if (prefLang) {
        lang = prefLang;
        this.#translateService.use(lang);
      }
    }
    this.#translateService.setDefaultLang('en-US');
    this.langControl.setValue(lang);
    this.langControl.valueChanges.subscribe((l) => this.onLangChange(l));
  }

  onLangChange(lang: string) {
    if (localStorage) {
      this.#windowService.setLocalStorage('lang', lang);
    }
    this.#translateService.use(lang);
  }
}

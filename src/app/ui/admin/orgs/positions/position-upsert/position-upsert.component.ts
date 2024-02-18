import { Component, OnInit } from '@angular/core';

import { DynamicFormComponent } from '@shared/components/forms/dynamic-form';
import { Field } from '@stores/forms';
import { BehaviorSubject } from 'rxjs';
import { positionMap } from './position.map';

@Component({
  selector: 'xtra-position-upsert',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="container">
      <div class="content">
        <xtra-dynamic-form [structure$]="fieldset$"></xtra-dynamic-form>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        height: 100vh;
      }

      .content {
        width: 30%;
        margin-top: 1.8rem;
      }
    `,
  ],
})
export class PositionUpsertComponent implements OnInit {
  private fieldsetSubject = new BehaviorSubject<Field[]>([]);
  fieldset$ = this.fieldsetSubject.asObservable();

  ngOnInit(): void {
    this.fieldsetSubject.next(positionMap);
  }

  save(): void {
    alert('saved');
  }
}

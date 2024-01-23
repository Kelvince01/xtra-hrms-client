import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Field} from "../../../../../data/store/forms/forms.interfaces";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cdt-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Field} from "../../../../../data/store/forms/forms.interfaces";
import {MatInputModule} from "@angular/material/input";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cdt-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [ReactiveFormsModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}

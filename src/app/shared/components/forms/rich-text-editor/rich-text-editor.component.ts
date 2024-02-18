import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContentChange, QuillEditorComponent, QuillModules } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'xtra-rich-text-editor',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule],
  template: `
    <quill-editor
      [formControl]="editorControl"
      [modules]="quillConfig"
      [placeholder]="''"
      (onContentChanged)="onContentChange($event)"
      (onFocus)="onFocus()"
      (onEditorCreated)="editorCreated($event)"
      classes="font-sans text-sm"
      [styles]="{ minHeight: '6rem' }"></quill-editor>
  `,
  styles: ``,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter();

  editorControl: FormControl;

  quillConfig: QuillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline'],
      [{ 'color': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],

      ['blockquote', 'code-block'],

      [{ 'indent': '-1' }, { 'indent': '+1' }],

      [{ 'align': [] }],
    ],
  };

  content!: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private onTouched!: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private onChanged!: Function;

  constructor() {
    this.editorControl = new FormControl();
  }

  ngOnInit(): void {}

  writeValue(content: string): void {
    this.editorControl.patchValue(content);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onContentChange(content: ContentChange): void {
    this.onChanged(content.html);
  }

  onFocus(): void {
    this.onTouched();
  }

  onBlur(): void {
    this.blur.emit();
  }

  editorCreated(editor: Quill): void {
    editor.focus();
  }
}

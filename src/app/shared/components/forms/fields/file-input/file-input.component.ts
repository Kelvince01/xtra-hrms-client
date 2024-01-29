import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  DoCheck,
  HostBinding,
  ElementRef,
  Renderer2,
  Optional,
  Self,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import {Subject} from 'rxjs';
import {FileInputMixinBase} from './file-input-mixin';
import {FileInput} from './model/file-input.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xtra-mat-file-input',
  template: `
    <input #input type="file" [attr.multiple]="multiple ? '' : null" [attr.accept]="accept" />
    <span class="filename" [title]="fileNames">{{ fileNames }}</span>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
      :host:not(.file-input-disabled) {
        cursor: pointer;
      }

      input {
        width: 0px;
        height: 0px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }

      .filename {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }
    `,
  ],
  imports: [MatInputModule, ReactiveFormsModule],
  standalone: true,
})
export class FileInputComponent
  extends FileInputMixinBase
  implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy, DoCheck
{
  static nextId = 0;

  focused = false;
  controlType = 'file-input';

  @Input() autofilled = false;

  private _placeholder: string = '';
  private _required = false;
  private _multiple: boolean = false;

  @Input() valuePlaceholder: string = '';
  @Input() accept: string | null = null;
  @Input() override errorStateMatcher!: ErrorStateMatcher;

  @HostBinding() id = `xtra-file-mat-input-${FileInputComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get value(): FileInput | null {
    return this.empty ? null : new FileInput(this._elementRef.nativeElement.value || []);
  }
  set value(fileInput: FileInput | null) {
    if (fileInput) {
      this.writeValue(fileInput);
      this.stateChanges.next();
    }
  }

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean | string) {
    this._multiple = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  /**
   * Whether the current input has files
   */
  get empty(): boolean {
    return (
      !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0
    );
  }

  @HostBinding('class.mat-form-field-should-float')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty || this.valuePlaceholder !== undefined;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: boolean | string) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.file-input-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
  @Input()
  get disabled(): boolean {
    return this._elementRef.nativeElement.disabled;
  }
  set disabled(dis: boolean | string) {
    this.setDisabledState(coerceBooleanProperty(dis));
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this._elementRef.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  /**
   * @see https://angular.io/api/forms/ControlValueAccessor
   */
  constructor(
    private fm: FocusMonitor,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    public override _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    public override ngControl: NgControl,
    @Optional() public override _parentForm: NgForm,
    @Optional() public override _parentFormGroup: FormGroupDirective,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl, new Subject<void>());

    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(_elementRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  private _onChange = (_: any): void => {};
  private _onTouched = (): void => {};

  get fileNames(): string {
    return this.value ? this.value.fileNames : this.valuePlaceholder;
  }

  writeValue(obj: FileInput | null): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'value',
      obj instanceof FileInput ? obj.files : null,
    );
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /**
   * Remove all files from the file input component
   * @param [event] optional event that may have triggered the clear action
   */
  clear(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.value = new FileInput([]);
    this._elementRef.nativeElement.querySelector('input').value = null;
    this._onChange(this.value);
  }

  @HostListener('change', ['$event'])
  change(event: Event): void {
    const fileList: FileList | null = (<HTMLInputElement>event.target).files;
    const fileArray: File[] = [];
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i]);
      }
    }
    this.value = new FileInput(fileArray);
    this._onChange(this.value);
  }

  @HostListener('focusout')
  blur(): void {
    this.focused = false;
    this._onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  ngOnInit(): void {
    this.multiple = coerceBooleanProperty(this.multiple);
  }

  open(): void {
    if (!this.disabled) {
      this._elementRef.nativeElement.querySelector('input').click();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this._elementRef.nativeElement);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }
}

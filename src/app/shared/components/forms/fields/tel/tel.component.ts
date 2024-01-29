import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

/** Data structure for holding telephone number. */
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string,
  ) {}
}

/*
USAGE:
<mat-form-field appearance="fill">
		<mat-label>Phone number</mat-label>
		<xtra-tel-input formControlName="tel" required></xtra-tel-input>
		<mat-icon matSuffix>phone</mat-icon>
		<mat-hint>Include area code</mat-hint>
	</mat-form-field>
 */
@Component({
  selector: 'xtra-tel',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="parts" class="xtra-tel-input-container">
      <input
        class="xtra-tel-input-element"
        formControlName="area"
        size="3"
        maxLength="3"
        aria-label="Area code"
        (input)="_handleInput(parts.controls.area, exchange)"
        #area
      />
      <span class="xtra-tel-input-spacer">&ndash;</span>
      <input
        class="xtra-tel-input-element"
        formControlName="exchange"
        maxLength="3"
        size="3"
        aria-label="Exchange code"
        (input)="_handleInput(parts.controls.exchange, subscriber)"
        (keyup.backspace)="autoFocusPrev(parts.controls.exchange, area)"
        #exchange
      />
      <span class="xtra-tel-input-spacer">&ndash;</span>
      <input
        class="xtra-tel-input-element"
        formControlName="subscriber"
        maxLength="4"
        size="4"
        aria-label="Subscriber number"
        (input)="_handleInput(parts.controls.subscriber)"
        (keyup.backspace)="autoFocusPrev(parts.controls.subscriber, exchange)"
        #subscriber
      />
    </div>
  `,
  styles: [
    `
      .xtra-tel-input-container {
        display: flex;
      }

      .xtra-tel-input-element {
        border: none;
        background: none;
        padding: 0;
        outline: none;
        font: inherit;
        text-align: center;
      }

      .xtra-tel-input-spacer {
        opacity: 0;
        transition: opacity 200ms;
      }

      :host.xtra-floating .xtra-tel-input-spacer {
        opacity: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MatFormFieldControl, useExisting: TelComponent}],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.xtra-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  },
})
export class TelComponent implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy {
  static nextId = 0;
  @ViewChild('area') areaInput!: HTMLInputElement;
  @ViewChild('exchange') exchangeInput!: HTMLInputElement;
  @ViewChild('subscriber') subscriberInput!: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'xtra-tel-input';
  id = `xtra-tel-input-${TelComponent.nextId++}`;
  describedBy = '';
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onTouched = () => {};

  get empty(): boolean {
    const {
      value: {area, exchange, subscriber},
    } = this.parts;

    return !area && !exchange && !subscriber;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    if (this.parts.valid) {
      const {
        value: {area, exchange, subscriber},
      } = this.parts;
      return new MyTel(area, exchange, subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    const {area, exchange, subscriber} = tel || new MyTel('', '', '');
    this.parts.setValue({area, exchange, subscriber});
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.parts = formBuilder.group({
      area: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      exchange: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      subscriber: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });

    _focusMonitor.monitor(_elementRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && !!nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if (this.parts.controls['subscriber'].valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls['exchange'].valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls['area'].valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(tel: MyTel | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
}

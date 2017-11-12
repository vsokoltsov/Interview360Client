import { Component, Input, OnInit, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input('value') _value = '';
  @Input('placeholder') _placeholder;
  @Input('className') _class;
  @Input('Change') _onChange;
  @Input('onOut') _onOut;
  @Input('showPopup') _showPopup;
  @Input('items') _items;
  @Input('popupId') _popupId;
  @Input('disabled') _disabled;
  @HostListener('document:click', ['$event'])
  clickOuter(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this._showPopup = false;
      if (this._onOut) {
        this._onOut();
      }
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }
}

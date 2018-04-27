import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSvgIconModule } from 'ngx-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectComponent
      ],
      imports: [
        NgSelectModule,
        NgxSvgIconModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.control = 'control';
    component.group = new FormGroup({
      'control': new FormControl(null)
    });
    component.selectItems = [{
      title: 'Title',
      key: 'Key'
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

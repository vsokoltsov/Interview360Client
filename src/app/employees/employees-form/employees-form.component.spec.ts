import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { EmployeesFormComponent } from './employees-form.component';

describe('EmployeesFormComponent', () => {
  let component: EmployeesFormComponent;
  let fixture: ComponentFixture<EmployeesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesFormComponent
      ],
      imports: [
        NgxSvgIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEmptyComponent } from './employees-empty.component';

describe('EmployeesEmptyComponent', () => {
  let component: EmployeesEmptyComponent;
  let fixture: ComponentFixture<EmployeesEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

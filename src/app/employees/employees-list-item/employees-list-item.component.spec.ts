import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListItemComponent } from './employees-list-item.component';

describe('EmployeesListItemComponent', () => {
  let component: EmployeesListItemComponent;
  let fixture: ComponentFixture<EmployeesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

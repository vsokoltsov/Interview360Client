import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplacesFormComponent } from './workplaces-form.component';

describe('WorkplacesFormComponent', () => {
  let component: WorkplacesFormComponent;
  let fixture: ComponentFixture<WorkplacesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplacesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplacesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

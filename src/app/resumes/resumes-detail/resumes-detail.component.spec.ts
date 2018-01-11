import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesDetailComponent } from './resumes-detail.component';

describe('ResumesDetailComponent', () => {
  let component: ResumesDetailComponent;
  let fixture: ComponentFixture<ResumesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

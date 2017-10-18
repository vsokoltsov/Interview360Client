import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesListItemComponent } from './vacancies-list-item.component';

describe('VacanciesListItemComponent', () => {
  let component: VacanciesListItemComponent;
  let fixture: ComponentFixture<VacanciesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanciesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

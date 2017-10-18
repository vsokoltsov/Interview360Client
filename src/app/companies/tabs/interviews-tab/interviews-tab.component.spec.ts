import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { InterviewsTabComponent } from './interviews-tab.component';
import { PipeModule } from '../../../shared/pipe.module';
import { CompaniesService } from '../../companies.service';
import { ApiService } from '../../../shared/api.service';

describe('InterviewsTabComponent', () => {
  let component: InterviewsTabComponent;
  let fixture: ComponentFixture<InterviewsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

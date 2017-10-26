import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { Interview } from '../interview.model';
import { PipeModule } from '../../shared/pipe.module';
import { InterviewsService } from '../interviews.service';
import { ApiService } from '../../shared/api.service';
import { InterviewListItemComponent } from './interview-list-item.component';

describe('InterviewListItemComponent', () => {
  let component: InterviewListItemComponent;
  let fixture: ComponentFixture<InterviewListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewListItemComponent
      ],
      imports: [
        NgxSvgIconModule,
        RouterTestingModule,
        PipeModule,
        HttpClientModule
      ],
      providers: [
        CookieService,
        ApiService,
        InterviewsService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

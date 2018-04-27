import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSvgIconModule } from 'ngx-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent
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
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

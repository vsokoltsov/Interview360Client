import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DebugElement }    from '@angular/core';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageComponent
      ],
      imports: [
        NgxSvgIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a svg-icon if attachment is empty', () => {
    component.url = 'http://test.com';
    component.size = 75;
    component.placeholder = 'user-placeholder';
    fixture.detectChanges();
    const svgItem = de.query(By.css('img')).nativeElement;
    expect(svgItem).not.toBeNaN();
  });

  it('shows a image if attachment is present', () => {
    component.size = 75;
    component.placeholder = 'user-placeholder';
    fixture.detectChanges();
    const svgItem = de.query(By.css('svg-icon')).nativeElement;
    expect(svgItem).not.toBeNaN();
  });
});

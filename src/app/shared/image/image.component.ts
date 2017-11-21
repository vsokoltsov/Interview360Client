import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input('url') url: string;
  @Input('size') size: number;
  @Input('placeholder') placeholder: string;

  constructor() { }

  ngOnInit() {
    console.log(this);
  }

}

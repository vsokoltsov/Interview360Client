import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() url: string;
  @Input() size: number;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}

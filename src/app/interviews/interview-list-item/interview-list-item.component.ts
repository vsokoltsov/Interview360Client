import { Component, OnInit, Input } from '@angular/core';

import { Interview } from '../interview.model';

@Component({
  selector: '[app-interview-list-item]',
  templateUrl: './interview-list-item.component.html',
  styleUrls: ['./interview-list-item.component.scss']
})
export class InterviewListItemComponent implements OnInit {
  @Input() interview: Interview;
  @Input() route: string[];

  constructor() { }

  ngOnInit() {
  }

}

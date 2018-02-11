import { Component, OnInit, Input } from '@angular/core';

import { Workplace } from '../../workplace.model';

@Component({
  selector: '[app-workplace-item]',
  templateUrl: './workplace-item.component.html',
  styleUrls: ['./workplace-item.component.scss']
})
export class WorkplaceItemComponent implements OnInit {
  @Input() workplace: Workplace;
  constructor() { }

  ngOnInit() {
  }

}

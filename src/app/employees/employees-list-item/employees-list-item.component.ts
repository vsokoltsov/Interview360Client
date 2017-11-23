import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../auth/user.model';

@Component({
  selector: '[app-employees-list-item]',
  templateUrl: './employees-list-item.component.html',
  styleUrls: ['./employees-list-item.component.scss']
})
export class EmployeesListItemComponent implements OnInit {
  @Input() employee: User;
  @Input() route: string[];

  constructor() { }

  ngOnInit() {
  }

}

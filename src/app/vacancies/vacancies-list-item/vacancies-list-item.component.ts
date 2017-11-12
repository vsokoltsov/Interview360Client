import { Component, OnInit, Input } from '@angular/core';

import { Vacancy } from '../vacancy.model';

@Component({
  selector: '[app-vacancies-list-item]',
  templateUrl: './vacancies-list-item.component.html',
  styleUrls: ['./vacancies-list-item.component.scss']
})
export class VacanciesListItemComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() route: string[];

  constructor() { }

  ngOnInit() {
  }

}

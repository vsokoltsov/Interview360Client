import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company.model';

@Component({
  selector: '[app-company-list-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class CompanyListItemComponent implements OnInit {
  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}

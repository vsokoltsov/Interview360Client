import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Company } from './company.model';
import { CompaniesService } from './companies.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  subscription: Subscription;

  constructor(private companiesService: CompaniesService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    console.log("init");
    this.companiesService.loadList();
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if(data.list) {
          console.log(data.list);
          this.companies = data.list;
        }
      }
    );
  }

}

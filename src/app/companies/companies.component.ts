import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
  companiesSearchForm: FormGroup;
  companies: Company[];
  subscription: Subscription;

  constructor(private companiesService: CompaniesService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.companiesService.loadList();
    this.companiesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.companiesSearchForm.get('query').valueChanges.subscribe(
      data => {
        this.searchCompanies(data);
      }
    );
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if(data.list) {
          this.companies = data.list;
        }
      }
    );
  }

  searchCompanies(query: string) {
    this.companiesService.searchCompanies(query)
  }

}

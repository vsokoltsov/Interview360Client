import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from './resume.model';
import { ResumesService } from './resumes.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent implements OnInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef;
  resumesSearchForm: FormGroup;
  resumesFilterForm: FormGroup;
  resumes: Resume[];
  subscription: Subscription;
  searchTimeout: any;
  filters: {
    salary?: {
      min?: number,
      max?: number
    }
  };
  salaryRangeConfig: any = {
    start: [0, 5],
    behaviour: 'drag',
    connect: true,
    margin: 1,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  resumesParams: {};

  constructor(
    private resumesService: ResumesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.resumesService.loadResumes();
    this.resumesService.getFilters();
    this.subscription = this.store.select('resumes').subscribe(
      data => {
        if (data.list) {
          this.resumes = data.list;
        }
        if (data.filters) {
          this.filters = data.filters;
          this.salaryRangeConfig.range['min'] = this.filters.salary.min;
          this.salaryRangeConfig.range['max'] = this.filters.salary.max;
          this.sliderRef.slider.updateOptions({
            range: {
              min: this.filters.salary.min,
              max: this.filters.salary.max
            }
          });
        }
      }
    );
    this.resumesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.resumesFilterForm = new FormGroup({
      salary: new FormControl(null)
    });
    this.resumesSearchForm.get('query').valueChanges.subscribe(
      data => {
        if (!this.searchTimeout) {
          this.searchTimeout = setTimeout(() => {
            this.resumesService.searchResumes(data);
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
          }, 1000);
        }
      }
    );
  }

  searchResumes(event) {
    this.resumesService.searchResumes(event.target.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch() {
    const queryString = this.resumesSearchForm.get('query').value;
    this.resumesService.searchResumes(queryString);
  }

  submitFilter() {
    const salaryVal = this.resumesFilterForm.get('salary').value;
    if (salaryVal) {
      const salary_min = salaryVal[0];
      const salary_max = salaryVal[1];
      const salary = JSON.stringify({
        min: salary_min,
        max: salary_max
      });
      this.resumesService.loadResumes({ salary });
    }
  }

  cancelFilter() {
    this.resumesFilterForm.reset();
    this.resumesService.loadResumes()
  }

}

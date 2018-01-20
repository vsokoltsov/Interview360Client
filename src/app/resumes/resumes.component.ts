import { Component, OnInit, OnDestroy } from '@angular/core';
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
  resumesSearchForm: FormGroup;
  resumes: Resume[];
  subscription: Subscription;
  searchTimeout: any;

  constructor(
    private resumesService: ResumesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.resumesService.loadResumes();
    this.subscription = this.store.select('resumes').subscribe(
      data => {
        if (data.list) {
          this.resumes = data.list;
        }
      }
    );
    this.resumesSearchForm = new FormGroup({
      'query': new FormControl(null)
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
    console.log(event.target.value);
    this.resumesService.searchResumes(event.target.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch() {
    const queryString = this.resumesSearchForm.get('query').value;
    this.resumesService.searchResumes(queryString);
  }

}

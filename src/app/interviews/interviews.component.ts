import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Interview } from './interview.model';
import { InterviewsService } from './interviews.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  interviews: Interview[];
  subscription: Subscription;
  companyId: number;

  constructor(
    private interviewsService: InterviewsService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.companyId = params['companyId'];
        this.interviewsService.loadList(this.companyId);
    });

    this.subscription = this.store.select('interviews').subscribe(
      data => {
        if (data.list.length > 0) {
          console.log(data.list);
          this.interviews = data.list;
        }
      }
    );

  }

}

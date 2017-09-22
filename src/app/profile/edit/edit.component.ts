import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ProfileService } from '../profile.service';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  routerLinks = [
    { label: 'Info', link: '' }
  ];
  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const profileId = params['id'];
        this.profileService.receiveProfile(profileId);
    });
  }
}

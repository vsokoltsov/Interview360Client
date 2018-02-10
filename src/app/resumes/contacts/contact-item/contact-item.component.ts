import { Component, OnInit } from '@angular/core';

import { Resume } from '../../resume.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  resume: Resume;

  constructor() { }

  ngOnInit() {
  }

}

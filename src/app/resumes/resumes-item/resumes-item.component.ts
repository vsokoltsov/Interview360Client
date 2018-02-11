import { Component, OnInit, Input } from '@angular/core';

import { Resume } from '../resume.model';

@Component({
  selector: '[app-resumes-item]',
  templateUrl: './resumes-item.component.html',
  styleUrls: ['./resumes-item.component.scss']
})
export class ResumesItemComponent implements OnInit {
  @Input() resume: Resume;

  constructor() { }

  ngOnInit() {
  }

}

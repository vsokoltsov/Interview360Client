import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdDrawer;

  constructor() { }

  ngOnInit() {
  }

  toggleNavigation() {
    this.sidenav.toggle();
  }
}

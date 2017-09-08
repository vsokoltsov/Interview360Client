import { Component, ViewChild } from '@angular/core';
import { MdDrawer } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav: MdDrawer;

  toggleNavigation() {
    this.sidenav.toggle();
  }
}

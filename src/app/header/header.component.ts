import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onMenuClicked: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  toggleMenu() {
    this.onMenuClicked.emit();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-order-filter]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() orders: string[];
  @Output() onOrderSelected = new EventEmitter<string>();
  selectedOrder: string;
  orderDirection: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  selectOrder(order: string) {
    if (this.selectedOrder === order) {
      this.orderDirection = !this.orderDirection;
    } else {
      this.selectedOrder = order;
      this.orderDirection = true;
    }

  }

}

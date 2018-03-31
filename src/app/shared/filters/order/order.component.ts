import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Order } from '../order.model';

@Component({
  selector: '[app-filter-order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnChanges {
  @Input() orders: Order[];
  @Output() onOrderSelected = new EventEmitter<string>();
  selectedOrder: Order;
  orderDirection: boolean = true;
  @Input() reset: boolean;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.reset) {
      this.selectedOrder = null;
    }
  }

  selectOrder(order: Order) {
    if (this.selectedOrder && this.selectedOrder.key === order.key) {
      this.orderDirection = !this.orderDirection;
    } else {
      this.selectedOrder = order;
      this.orderDirection = true;
    }
    this.onOrderSelected.emit(this.correctOrderValue());
  }

  correctOrderValue() {
    return this.orderDirection ? this.selectedOrder.key : `-${this.selectedOrder.key}`;
  }

}

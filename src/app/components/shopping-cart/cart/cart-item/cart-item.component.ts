import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any
  @Output() deleteCartItem = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  passCartItemToCart(){
    this.deleteCartItem.emit(this.cartItem)
  }

}

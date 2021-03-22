import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;
  constructor(private msg: MessengerService,
              private cartService: CartService,
              private router: Router) { }
              

  ngOnInit(): void {
    this.handleSubscription()
    this.loadCartItems()
   
  }
  irAFormulario(){
    this.router.navigate(['/formulario', { cartItems: this.cartItems}]);
  }
  handleSubscription(){
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
    })
  }
  loadCartItems(){
    this.cartService.getCartItem().subscribe((items: CartItem[]) => {
    this.cartItems = items;
    this.calculatedTotalCart();
    })
  }

  calculatedTotalCart(){
    this.cartTotal = 0 
    this.cartItems.forEach(item =>{
      this.cartTotal += (item.qty * item.price)
    })
  }
  deleteCartItem(cartItemChild){
     for (let i = 0; i < this.cartItems.length; i++) {
      let cartItem = this.cartItems[i];
      if(cartItemChild.productId === cartItem.productId){
        if(cartItem.qty > 1){
          cartItem.qty --;
          let id = cartItemChild.id.toString()
          this.cartService.deleteCart(id).subscribe()
          
          
        }else if ( cartItem.qrt = 1){
          this.cartItems.splice(i, 1)
          let id = cartItemChild.id.toString()
          this.cartService.deleteCart(id).subscribe()
        }
      }
      
    } 
    window.location.reload();
    
  }
}


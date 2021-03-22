import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cartFinishUrl, cartUrl } from 'src/config/api';
import { Product } from '../models/product';
import { map } from 'rxjs/operators'
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  cartItems = []

  getCartItem(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = []


        for (let item of result) {
          let productExist = false;

          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].qty++
              productExist = true;
              break;
            }
          }

          if (!productExist) {
            cartItems.push(new CartItem(item.id, item.product));
          }
        }
        return cartItems;
      })
    );
  }
  deleteCart(id: number): Observable<{}> {
    return this.http.delete<any>(cartUrl + '/' + id)

  }
  addCartFinish(cart: Cart ): Observable<any>{
    return this.http.post(cartFinishUrl, {cart })
  }


  addProductToCart(product: Product): Observable<any> {
    return this.http.post(cartUrl, { product })
  }
}

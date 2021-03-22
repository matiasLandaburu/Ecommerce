import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {  Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  model: any = {}
  usuarios: Usuario[] = [];
  cartItems: CartItem[] = [];
  cartTotal = 0;
 
  constructor(private usuarioService: UsuarioService,
               private router: Router,
              private cartService: CartService,
              ) { }
              @Input() cartItem: any

  ngOnInit(): void {

    
    this.getCartItems();
  }
  calculatedTotalCart(){
    this.cartTotal = 0 
    if(this.cartItems.length >0){
      this.cartItems.forEach(item =>{
        this.cartTotal += (item.qty * item.price)
      })
      if(this.cartItems.length === 4){
          this.cartTotal = this.cartTotal*0.75;
      }// aca tenia que hacer lo de las fechas especiales pero no pude encontrar una manera para tener el dia de la fecha y pregunta si era especial.
    }

  }
  async getCartItems(){
    this.cartService.getCartItem().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calculatedTotalCart();
      })
  }
  async getUsers() {
    await this.usuarioService.getUsers().subscribe((users) => {
      this.usuarios = users

    })
  }
  async comprar() {
    let userOld: Usuario
    let usuarioNew = new Usuario(this.model.name, this.model.lastName, 0, this.model.mail);



     this.getUsers()
    let i = 0
    if (this.usuarios.length > 0) {
      while (userOld == null && i <= this.usuarios.length) {
        let userDb = this.usuarios[i];
        if (userDb.mail === usuarioNew.mail) {
          userOld = userDb
        }

      }

      if (userOld == null) {
        this.usuarioService.createNewUser(usuarioNew).subscribe((usuarioCreado) => {
          userOld = usuarioCreado
        })
      } 

    }

/*     let cart: Cart = new Cart( this.cartItems, userOld,false, this.cartTotal)
    this.cartService.addCartFinish(cart).subscribe((carritoTerminado) => {
    }) */ //aca deberia guardar la nueva compra pero no me anduvo.

    this.deleteCart()
    
    this.router.navigate(['']);
  }
  async deleteCart(){// Aca deberia borrar todos los objetos pero solo elimina uno
    let i = 0
    while(i < this.cartItems.length){
      let cartItem = this.cartItems[i];
      let id = cartItem.id
      await this.cartService.deleteCart(id).subscribe()
      i++
    }

  } 
}

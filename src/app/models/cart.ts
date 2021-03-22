import { CartItem } from "./cart-item";
import { Usuario } from "./usuario";

export class Cart {
    cartItems: CartItem[];
    usuario: Usuario;
    esComun: Boolean;
    precioFinal: number;

    constructor( cartItems, usuario, esComun, precioFinal){
        this.cartItems = cartItems;
        this.usuario = usuario;
        this.esComun = esComun;
        this.precioFinal = precioFinal;
    }
}

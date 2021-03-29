import { Injectable } from '@angular/core';
import { CarDto } from '../models/carDto';
import { CartItem } from '../models/carItem';
import { CartItems } from '../models/carItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(carDto:CarDto){
    let cartItem = new CartItem();
    cartItem.car = carDto;
    CartItems.push(cartItem)
  }

  // removeFromCart(car:CarDto){
  //   let item:CartItem = CartItems.find(c=>c.car.brandName === car.brandName);
  //   CartItems.splice(CartItems.indexOf(item),1);
  // }

  list():CartItem[]{
    return CartItems;
  }

}

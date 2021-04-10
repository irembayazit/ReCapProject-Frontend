import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CartItem } from 'src/app/models/carItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[] = [];
  authControl:boolean=false;
  constructor(private cartService:CartService,
    private toastrService:ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()==true){     
      this.authControl = true
    }
  }


  getCart(){
    this.cartItems = this.cartService.list();
  }

  // removeFromCart(car:CarDto){
  //   this.cartService.removeFromCart(car);
  //   this.toastrService.error(car.brandName + "silindi");
  // }

}

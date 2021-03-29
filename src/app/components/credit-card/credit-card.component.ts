import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  constructor(private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private cartService:CartService) { }

  nameSurname:string;
  CardNumber:string;
  GuvenlikKodu:string;
  creditCard:CreditCard;
  cars:CarDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }

  
  Add(){
      this.creditCard = {NameSurname:this.nameSurname,CardNumber:this.CardNumber,CardCvv:this.GuvenlikKodu,Money:100}
      this.creditCardService.Add(this.creditCard).subscribe(response=>{
        if(response.success){
          this.toastrService.success("Arabayı kiraladınız","Işlem başarılı");
          this.cartService.addToCart(this.cars);
        }
      })
    }

    

}

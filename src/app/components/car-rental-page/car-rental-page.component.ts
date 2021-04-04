import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental-page',
  templateUrl: './car-rental-page.component.html',
  styleUrls: ['./car-rental-page.component.css']
})
export class CarRentalPageComponent implements OnInit {

  rentalDto:RentalDto[];
  car:Car;
  filterText:Date;
  startDate:Date;
  endDate:Date;
  rentable:Boolean = false;
  rentalCar:Rental;
  cars:CarDto;
  nameSurname:string;
  CardNumber:string;
  GuvenlikKodu:string;
  creditCard:CreditCard;
  endDateCart:string;
  name:User;

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private creditCardService:CreditCardService,
    private carService:CarService,
    private cartService:CartService,
    private rentalService:RentalService,
    private authService: AuthService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["carId"]){
          this.getRentalByCarId(params["carId"])
        }
        if(this.authService.isAuthenticated()==true){     
          let email = JSON.parse(localStorage.getItem("user") ||'{}');
          console.log(email)
          this.getUser(email);
        }
      })
    }
  
    getUser(email:string){
   
      this.authService.getUser(email).subscribe(response=>{
        this.name = response.data;
        console.log(this.name.customerId)
      })
    }

    getRentalByCarId(carId:number){
      this.carService.getCarById(carId).subscribe(response=>{
        this.car = response.data;
        console.log(this.car.id)
      })
    }


  

  setRentable(){
    this.rentalService.isRentable(this.rentalCar).subscribe(response=>{
      this.rentable = response.success
      console.log(this.rentable + "*******")
    })
  }

  
  calculatePrice(){ 
    if(this.endDate < this.startDate){
      this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
    }
    else if(this.startDate && this.endDate){
      this.rentalCar = {carId:this.car.id , customerId:this.name.customerId, rentDate:this.startDate, returnDate:this.endDate};
      console.log(this.rentalCar)
      this.setRentable();
    }
    
  }



  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }


  
  Add(){
    this.creditCard = {CustomerId:this.name.customerId, NameSurname:this.nameSurname,CardNumber:this.CardNumber,CardCvv:this.GuvenlikKodu,EndDate:this.endDateCart,Money:100}
    this.creditCardService.Add(this.creditCard).subscribe(response=>{
      if(response.success){
        this.rentalService.addRental(this.rentalCar).subscribe(response=>{
          if(response.success){
            this.toastrService.success("Arabayı kiraladınız","Işlem başarılı");
          }
        },responseError=>{
          console.log(responseError)
          this.toastrService.error(responseError.error.message)
        })
        this.cartService.addToCart(this.cars);
      }
    })
  }

}

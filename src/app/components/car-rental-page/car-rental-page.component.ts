import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
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
  rental:Rental;
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
  
  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router,
    private creditCardService:CreditCardService,
    private carService:CarService,
    private cartService:CartService,) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["carId"]){
          this.getRentalByCarId(params["carId"])
        }
      })
    }
  
    getRentalByCarId(carId:number){
      this.rentalService.getRentalByCarId(carId).subscribe(response=>{
        this.rental = response.data;
        console.log(this.rental)
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
      this.rentalCar = {carId:this.rental.carId , customerId:this.rental.customerId, rentDate:this.startDate, returnDate:this.endDate};
      this.setRentable();
    }
    
  }



  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }


  
  Add(){
      this.creditCard = {NameSurname:this.nameSurname,CardNumber:this.CardNumber,CardCvv:this.GuvenlikKodu,EndDate:this.endDateCart,Money:100}
      this.creditCardService.Add(this.creditCard).subscribe(response=>{
        if(response.success){
          this.rentalService.addRental(this.rentalCar).subscribe(response=>{
            if(response.success){
              this.toastrService.success("Arabayı kiraladınız","Işlem başarılı");
            }
          })
          this.cartService.addToCart(this.cars);
        }
      })
      

    
    }

}

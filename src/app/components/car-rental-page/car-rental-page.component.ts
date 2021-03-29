import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental-page',
  templateUrl: './car-rental-page.component.html',
  styleUrls: ['./car-rental-page.component.css']
})
export class CarRentalPageComponent implements OnInit {

  rental:RentalDto[];
  filterText:Date;
  startDate:Date;
  endDate:Date;
  rentable:Boolean = false;
  
  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getRentalByCarId(params["carId"])
      }
    })
  }

  getRentalByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response=>{
      this.rental = response.data;
    })
  }

  rentalCar:Rental;

  setRentable(){
    this.rentalService.isRentable(this.rentalCar).subscribe(response=>{
      this.rentable = response.success
      console.log(this.rentable + "*******")
    })
  }

  
  calculatePrice(){ 
    if(this.startDate && this.endDate){
      
      console.log("tarih girildi");
      this.rentalCar = {rentalId:16 , CarId:1 , customerId:1, rentDate:this.startDate, returnDate:this.endDate};
      this.setRentable();
    }
    else{
      this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
    }
  }

  addRental(){
    if(this.rentable){
      this.rentalCar = this.rentalCar;
      console.log(this.rentalCar)
      this.router.navigate(['/creditcard/' , JSON.stringify(this.rentalCar)]);
      this.toastrService.info("Kredi kartı ödeme sayfasına yönlendiriliyor","Yönlendiriliyor")
    }else{
      this.toastrService.error("Bu tarihler arasında arabayı kiralayamazsınız","Zaten kiralanmış")
    }
  }

}

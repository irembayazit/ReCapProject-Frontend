import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages: CarImage[];
  car: CarDto;
  apiUrl = "https://localhost:44378/";
  
  constructor(private carDetailService:CarDetailService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImageByCarId(params["carId"]);
      }
    });
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.car = response.data;
    })
  }

  getCarImageByCarId(carId:number){
    this.carDetailService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages  = response.data;
    }) 
  }

  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item col-md-4 active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }


}

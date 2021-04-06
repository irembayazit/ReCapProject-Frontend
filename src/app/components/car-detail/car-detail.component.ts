import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  user:User;
  carImages: CarImage[];
  car: CarDto;
  apiUrl = "https://localhost:44378/";
  
  constructor(private carDetailService:CarDetailService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService,
    private authService: AuthService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImageByCarId(params["carId"]);
      }
    });
    if(this.authService.isAuthenticated()==true){     
      let email = this.localStorageService.getUser();
      console.log(email)
      this.getUser(email);
    }
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.car = response.data;
      console.log(this.car)
    })
  }

  getCarImageByCarId(carId:number){
    this.carDetailService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages  = response.data;
    }) 
  }

  getUser(email:string){  
    this.authService.getUser(email).subscribe(response=>{
      this.user = response.data;
    })
  }

  findexControl(){
    if(this.car.findex > this.user.findex){
      this.toastrService.error("Findex puanı yetersiz")
    }
    else{
      this.router.navigate(['/car/car-rental-page/'+ this.car.carId ]) 
    }
    
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

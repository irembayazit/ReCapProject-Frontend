import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental-page',
  templateUrl: './car-rental-page.component.html',
  styleUrls: ['./car-rental-page.component.css']
})
export class CarRentalPageComponent implements OnInit {
  dateForm : FormGroup;
  user:User;
  car:Car;
  rentable:boolean = false;

  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private carService:CarService,
    private authService: AuthService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getRentalByCarId(params["carId"])
      }      
    })    
    if(this.authService.isAuthenticated()==true){     
      let email = this.localStorageService.getUser();
      console.log(email)
      this.getUser(email);
    }    
    this.createAddForm();
    this.todayDate();
    
  }

  todayDate(){
    let dateTime = new Date();
    console.log(dateTime)
  }

  createAddForm(){
    this.dateForm = this.formBuilder.group({
      carId : ["", Validators.required],
      customerId : ["", Validators.required],
      rentDate : ["", Validators.required],
      returnDate : ["", Validators.required],
    })
  }

  getUser(email:string){  
    this.authService.getUser(email).subscribe(response=>{
      this.user = response.data;
      this.dateForm.patchValue({        
        customerId: this.user.customerId,
      })
    })
  }

  getRentalByCarId(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.car = response.data;
      this.dateForm.patchValue({
        carId: this.car.id,
      })
    })
  }

  getCurrentClass(){
    if(this.rentable){
      return "form-control is-valid"
    } 
    else{
      return "form-control is-invalid"
    }
  }

  setRentable(){
    if(this.dateForm.valid){
      let dateModel = Object.assign({},this.dateForm.value)
      console.log(this.dateForm.value)      
      this.rentalService.isRentable(dateModel).subscribe(response=>{
        console.log(this.rentalService.rentalCheckout)
        this.rentable = response.success;       
      },responseError=>{ 
        if(responseError.error){
          this.rentable = responseError.success; 
          this.toastrService.error(responseError.error.message)
          this.rentalService.rentalCheckout = false;
          console.log(this.rentalService.rentalCheckout)
        }
      })   
    }else{      
      this.toastrService.error("Form is missing","Warning!")
    }
  }
 

  
  // calculatePrice(){ 
  //   if(this.endDate < this.startDate){
  //     this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
  //   }
  //   else if(this.startDate && this.endDate){
  //     this.rentalCar = {carId:this.car.id , customerId:this.name.customerId, rentDate:this.startDate, returnDate:this.endDate};
  //     console.log(this.rentalCar)
  //     this.setRentable();
  //   }
  // }

  // getCarDetailsByCarId(carId:number){
  //   this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
  //     this.cars = response.data;
  //   })
  // }

  

}

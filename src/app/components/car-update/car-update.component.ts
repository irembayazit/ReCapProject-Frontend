import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  carDto:CarDto;
  carUpdateForm : FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  
  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"])
        this.getCarDetailsByCarId(params["carId"])
      }
      this.createcarUpdateForm();
      this.getColors();
      this.getBrands();
    })
  }
  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.car = response.data;
      console.log(this.car);
      console.log(this.car.id);
      this.carUpdateForm.setValue({
        colorId: this.car.colorId,
        brandId: this.car.brandId,
        modelYear: this.car.modelYear,
        dailyPrice: this.car.dailyPrice,
        description: this.car.description
      })
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDto = response.data;
      console.log(this.carDto);
      
    })
  }

  
  

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createcarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId : ["",Validators.required],
      colorId : ["",Validators.required],
      modelYear : ["",Validators.required],
      dailyPrice : ["",Validators.required],
      description : ["",Validators.required],
    });
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      carModel.id = this.car.id;
      this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success(response.message,"Güncelleme işlemi başarılı");
    },responseError=>{
      if(responseError.error && responseError.error.Errors && responseError.error.Errors.length >0){
        console.log(responseError.error.Errors)
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama hatası");
        }
      } 
    })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat!")
    }
  }
  


  
}

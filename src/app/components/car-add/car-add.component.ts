import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm(){
    this.carAddForm = this.formBuilder.group({
      BrandId : ["",Validators.required],
      ColorId : ["",Validators.required],
      ModelYear : ["",Validators.required],
      DailyPrice : ["",Validators.required],
      Description : ["",Validators.required],
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"İşlem");
      },responseError=>{
        if(responseError.error.Errors.length >0){
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("formunuz eksik","Dikkat!")
    }
  }

}

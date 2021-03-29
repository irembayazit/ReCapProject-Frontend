import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-updates',
  templateUrl: './brand-updates.component.html',
  styleUrls: ['./brand-updates.component.css']
})
export class BrandUpdatesComponent implements OnInit {

  brand:Brand;
  BrandUpdateForm : FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getBrandByBrandId(params["brandId"])
      }
      this.createBrandUpdateForm();
    })
  }

  getBrandByBrandId(brandId:number){
    this.brandService.getBrandByBrandId(brandId).subscribe(response=>{
      this.brand = response.data;
      console.log(this.brand)
      this.BrandUpdateForm.setValue({
        brandId: this.brand.brandId,
        name: this.brand.name,
      })
    })
  }

  createBrandUpdateForm(){
    this.BrandUpdateForm = this.formBuilder.group({
      brandId : ["",Validators.required],
      name : ["",Validators.required],
    });
  }

  update(){
    if(this.BrandUpdateForm.valid){
      let brandModel = Object.assign({},this.BrandUpdateForm.value)
      brandModel.brandId = this.brand.brandId;
      this.brandService.update(brandModel).subscribe(response=>{
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

import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  ColorUpdateForm : FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getColorByColorId(params["colorId"])
      }
      this.createColorUpdateForm();
    })
  }

  getColorByColorId(colorId:number){
    this.colorService.getColorByColorId(colorId).subscribe(response=>{
      this.color = response.data;
      console.log(this.color)
      this.ColorUpdateForm.setValue({
        colorId: this.color.colorId,
        name: this.color.name,
      })
    })
  }

  createColorUpdateForm(){
    this.ColorUpdateForm = this.formBuilder.group({
      colorId : ["",Validators.required],
      name : ["",Validators.required],
    });
  }

  update(){
    if(this.ColorUpdateForm.valid){
      let colorModel = Object.assign({},this.ColorUpdateForm.value)
      colorModel.colorId = this.color.colorId;
      this.colorService.update(colorModel).subscribe(response=>{
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

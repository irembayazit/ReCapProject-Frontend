import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;

  constructor(private fomrBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fomrBuilder.group({
      firstName : ["",Validators.required],
      lastName:["",Validators.required],
      email : ["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel = Object.assign({},this.registerForm.value)

      this.authService.register(registerModel).subscribe(response=>{
        //console.log(response)
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        this.router.navigate(['/car']);
      } ,responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
        })
    }
  }

}

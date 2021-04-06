import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fomrBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fomrBuilder.group({
      email : ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)
       this.authService.login(loginModel).subscribe(response=>{

        this.router.navigate(['/car']);

        this.toastrService.info(response.message)

        this.localStorageService.setToken(response.data.token)
        this.localStorageService.setUser(loginModel.email);

        window.location.assign("http://localhost:4200/car")
        
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat!")
    }
  }

  register(){
    this.toastrService.success("Kayıt sayfasına yonlendiriliyorsunuz")
  }
}

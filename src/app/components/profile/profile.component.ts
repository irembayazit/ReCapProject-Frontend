import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  authControl:boolean=false;
  emailUser:string;
  userUpdatedForm : FormGroup;


  constructor(private authService: AuthService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()==true){     
      this.emailUser = this.localStorageService.getUser();
      console.log(this.emailUser)
      this.getUser(this.emailUser);
    }
  }

  getUser(email:string){
    this.authService.getUser(email).subscribe(response=>{
      console.log(response.data);
      this.authControl = true;
      this.user = response.data;
      this.createAddForm();
    })
  }

  createAddForm(){
    this.userUpdatedForm = this.formBuilder.group({
      id : [this.user.userId, Validators.required],
      customerId : [this.user.customerId, Validators.required],
      firstName : [this.user.firstName,Validators.required],
      lastName : [this.user.lastName,Validators.required],
      companyName : [this.user.companyName,Validators.required],
      currentPassword : ["",Validators.required],
      newPassword : ["",Validators.required],
      email : [this.emailUser,Validators.required],
    })
  }

  update(){
    let userModel = Object.assign({},this.userUpdatedForm.value)
    console.log(userModel)

    this.userService.update(userModel).subscribe(response=>{
      
      this.localStorageService.setUser(userModel.email);
      window.location.assign("http://localhost:4200/profile")

      this.toastrService.success(response.message,"İşlem");

    },responseError=>{
      this.toastrService.error(responseError.error.message);
      
    })
  }  
}

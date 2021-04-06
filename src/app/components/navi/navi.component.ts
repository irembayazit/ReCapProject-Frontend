import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  name:User;
  authControl:boolean=false;

  constructor(private authService: AuthService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()==true){     
      let email = this.localStorageService.getUser();
      console.log(email)
      this.getUser(email);
    }
  }

  getUser(email:string){
   
    this.authService.getUser(email).subscribe(response=>{
      console.log(response.data);
      this.authControl = true;
      this.name = response.data;
    })
  }


  logOut(){
    this.localStorageService.removeToken();
    this.localStorageService.removeUser();
    window.location.assign("http://localhost:4200/car")
  }


}

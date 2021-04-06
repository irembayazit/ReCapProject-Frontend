import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44378/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl + "login" , loginModel)
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl + "register" , registerModel)
  }

  getUser(email:string):Observable<ItemResponseModel<User>>{
    let newUrl=this.apiUrl+"getuserdtobyemail?email="+email;
    return this.httpClient.get<ItemResponseModel<User>>(newUrl);
  }

  isAuthenticated(){
    if(localStorage.getItem("token") ){
      return true;
    }
    else{
      return false;
    }
  }
}

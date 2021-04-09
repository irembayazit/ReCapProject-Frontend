import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenKey:string="token";
  currentUser:string="user";
  rentable:string="rentable";

  constructor(private userService:UserService) { }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token:string){
    localStorage.setItem(this.tokenKey,token);
  }

  removeToken(){
    localStorage.removeItem(this.tokenKey);
  }

  setUser(email:string){
    localStorage.setItem(this.currentUser,JSON.stringify(email));
  }

  getUser(){
    return JSON.parse(localStorage.getItem(this.currentUser) ||'{}');
  }

  removeUser(){
    localStorage.removeItem(this.currentUser);
  }

  setRental(rentable:boolean){
    localStorage.setItem(this.rentable,JSON.stringify(rentable));
  }

  getRental(){
    return JSON.parse(localStorage.getItem(this.rentable) ||'{}');
  }


  

}

import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenKey:string="token";
  currentUser:string="user";

  constructor() { }

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

}

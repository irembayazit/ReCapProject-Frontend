import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UpdateUser } from '../models/updateUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44320/api/user/";

  constructor(private httpClient:HttpClient) { }

  update(user:UpdateUser):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "userupdatedate";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }

  getAuthority():Observable<ResponseModel>{
    let newUrl = this.apiUrl + "authority";
    return this.httpClient.get<ResponseModel>(newUrl);
  }

}

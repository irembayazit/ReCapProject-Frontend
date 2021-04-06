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

  apiUrl = "https://localhost:44378/api/user/userupdatedate";

  constructor(private httpClient:HttpClient) { }

  update(user:UpdateUser):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl,user);
  }

}

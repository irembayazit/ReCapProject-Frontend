import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { customerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44378/api/customer/GetCustomerDetailDTOs";
  
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<customerResponseModel>{
    return this.httpClient.get<customerResponseModel>(this.apiUrl);
  }

}

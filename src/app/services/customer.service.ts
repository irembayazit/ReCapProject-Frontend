import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { listResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44320/api/customer/GetCustomerDetailDTOs";
  
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<listResponseModel<Customer>>{
    return this.httpClient.get<listResponseModel<Customer>>(this.apiUrl);
  }

}

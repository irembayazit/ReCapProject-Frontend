import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { CreditCard } from '../models/creditCard';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService{

  constructor(private httpClient:HttpClient) { }

  apiUrl ="https://localhost:44320/api/creditCards/";

  Add(creditCard:CreditCard):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl,creditCard);
  }

  cardControl(customerId:number):Observable<listResponseModel<CreditCard>>{
    let newUrl = this.apiUrl + "cardcontrol?customerId="  + customerId;
    return this.httpClient.get<listResponseModel<CreditCard>>(newUrl);
  }


  
}

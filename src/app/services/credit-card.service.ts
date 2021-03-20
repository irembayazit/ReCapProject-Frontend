import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { CreditCard } from '../models/creditCard';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService{

  constructor(private httpClient:HttpClient) { }

  apiUrl ="https://localhost:44378/api/creditCards/";

  Add(creditCard:CreditCard):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl,creditCard);
  }


  
}

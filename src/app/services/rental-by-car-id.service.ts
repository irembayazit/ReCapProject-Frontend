import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalByCarIdService {
  
  apiUrl="https://localhost:44378/api/rental/getallrentalbycarid?=";

  constructor(private httpClient:HttpClient) { }

  getRentalsByCarId(carId:number):Observable<listResponseModel<Rental>>{
    let newUrl = this.apiUrl + carId ;
    return this.httpClient.get<listResponseModel<Rental>>(newUrl);
  }
}

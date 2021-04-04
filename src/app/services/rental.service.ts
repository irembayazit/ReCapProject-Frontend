import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { Rental } from '../models/rental';
import { ItemResponseModel } from '../models/itemResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44378/api/rental/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<listResponseModel<RentalDto>>{
    let newUrl = this.apiUrl + "getallrentaldto";
    return this.httpClient.get<listResponseModel<RentalDto>>(newUrl);
  }

  getRentalsByCarId(carId:number):Observable<listResponseModel<RentalDto>>{
    let newUrl = this.apiUrl + "getallrentalbycarid?carId=" + carId ;
    return this.httpClient.get<listResponseModel<RentalDto>>(newUrl);
  }

  getRentalByCarId(carId:number):Observable<ItemResponseModel<Rental>>{
    let newUrl = this.apiUrl + "GetRentalByCarId?carId=" + carId ;
    return this.httpClient.get<ItemResponseModel<Rental>>(newUrl);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "isrentable";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl,rental);
  }
}

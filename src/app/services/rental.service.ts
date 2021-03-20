import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44378/api/rental/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<listResponseModel<RentalDto>>{
    let newUrl = this.apiUrl + "getall";
    return this.httpClient.get<listResponseModel<RentalDto>>(newUrl);
  }

  getRentalsByCarId(carId:number):Observable<listResponseModel<RentalDto>>{
    let newUrl = this.apiUrl + "getallrentalbycarid?=" + carId ;
    return this.httpClient.get<listResponseModel<RentalDto>>(newUrl);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "isrentable";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  addRental(rental:Rental){
    let newPath = this.apiUrl + "add"
    this.httpClient.post(newPath,rental).subscribe()
  }
}

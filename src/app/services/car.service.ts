import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44378/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcardetaildto";
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcarsbycolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcardetaildtobycarid?carId=" + carId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }




}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { CarDto } from '../models/carDto';
import { ResponseModel } from '../models/responseModel';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44378/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<listResponseModel<CarDto>>{
    let newPath = this.apiUrl + "car/getcardetaildto";
    return this.httpClient.get<listResponseModel<CarDto>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<listResponseModel<CarDto>>{
    let newPath = this.apiUrl + "car/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<CarDto>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<listResponseModel<CarDto>>{
    let newPath = this.apiUrl + "car/getcarsbycolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<CarDto>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<ItemResponseModel<CarDto>>{
    let newPath = this.apiUrl + "car/getcardetaildtobycarid?carId=" + carId;
    return this.httpClient.get<ItemResponseModel<CarDto>>(newPath);
  }


  getCarById(carId:number):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcarbyid?id=" + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "car/add",car);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "car/update",car);
  }




}

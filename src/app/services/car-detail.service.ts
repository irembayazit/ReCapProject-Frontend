import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44378/api/carImages/getimagesbycarid?carId=";
  
  getCarImageByCarId(carId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + carId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }

}

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

  apiUrl="https://localhost:44320/api/carImages/";
  
  getCarImageByCarId(carId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getimagesbycarid?carId=" + carId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }
  getAll():Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }
  getCarImageByColorId(colorId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getimagesbycolorid?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }
  getCarImageByBrandId(brandId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getimagesbybrandid?brandId=" +  brandId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }
  getCarImageByColorIdBrandId(colorId:number,brandId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getimagesbybrandidcolorid?colorId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44378/api/brand/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<listResponseModel<Brand>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<listResponseModel<Brand>>(newPath);
  }

  getBrandByBrandId(brandId:number):Observable<ItemResponseModel<Brand>>{
    let newPath = this.apiUrl + "getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ItemResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",brand);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44378/api/color/";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<listResponseModel<Color>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<listResponseModel<Color>>(newPath);
  }

  getColorByColorId(colorId:number):Observable<ItemResponseModel<Color>>{
    let newPath = this.apiUrl + "getcolorbycolorid?id=" + colorId;
    return this.httpClient.get<ItemResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add",color);
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",color);
  }

}

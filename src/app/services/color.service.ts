import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { colorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44378/api/color/getall";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<colorResponseModel>{
    return this.httpClient.get<colorResponseModel>(this.apiUrl);
  }

}

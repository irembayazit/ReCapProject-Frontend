import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { rentalResponseModel } from '../models/rentalResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44378/api/rental/getall";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<rentalResponseModel>{
    return this.httpClient.get<rentalResponseModel>(this.apiUrl);
  }
}

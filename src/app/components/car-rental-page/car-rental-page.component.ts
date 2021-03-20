import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalByCarIdService } from 'src/app/services/rental-by-car-id.service';

@Component({
  selector: 'app-car-rental-page',
  templateUrl: './car-rental-page.component.html',
  styleUrls: ['./car-rental-page.component.css']
})
export class CarRentalPageComponent implements OnInit {

  rental:Rental[] = [];
  filterText:Date;
  startDate:Date;
  endDate:Date;
  
  constructor(private rentalByCarIdService:RentalByCarIdService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getRentalByCarId(params["carId"])
      }
    })
  }

  getRentalByCarId(carId:number){
    this.rentalByCarIdService.getRentalsByCarId(carId).subscribe(response=>{
      this.rental = response.data;
    })
  }

  ValidationDate(filterText:Date){
    return "form-control is-invalid";
  }
}

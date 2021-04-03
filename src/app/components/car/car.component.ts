import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carDtos:CarDto[]=[];
  dataLoaded = false;
  filterText="";

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars();
      }
    })
  }

  getCars(){
      this.carService.getCars().subscribe(response=>{
        this.carDtos = response.data
        this.dataLoaded = true;
    });
  }
  
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDtos = response.data
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDtos = response.data
      this.dataLoaded = true;
    });
  }

  DetailPage(car:CarDto){
    this.toastrService.success("detay sayfasına yonlendiriliyorsunuz",car.brandName);
  }

  UpdatePage(car:CarDto){
    this.toastrService.success("güncelleme sayfasına yonlendiriliyorsunuz",car.brandName);
  }
  


}

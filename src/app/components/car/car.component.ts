import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  apiUrl = "https://localhost:44320/";
  carDtos:CarDto[]=[];
  dataLoaded = false;
  filterText="";
  carDto:CarDto;
  carImages: CarImage[] =[];

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private carDetailService:CarDetailService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"])
      {
        this.getCarsBrandAndColor(params["brandId"],params["colorId"])
      }
      else if(params["brandId"]){
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
  getCarImageByCarId(carId:number){
    this.carDetailService.getCarImageByCarId(carId).subscribe(response=>{      
      this.carImages.push(response.data[0]);
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

  getCarsBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarsBrandAndColor(brandId,colorId).subscribe(response=>{
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

import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand:Brand;
  filterTextBrand="";
  brandOption:number;

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
      this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item list-group-item-action active"
    }else{
      return "list-group-item list-group-item-action"
    }
  }

  // brandId:number;
  // getBrandId(brand:Brand){
  //   this.brandId = brand.brandId;
  //   console.log(this.brandId);
  //   return this.brandId;
  // }

  getSelectedBrand(brandId: Number) {
    if (this.brandOption == brandId)
      return true;
    else
      return false;
  }

}

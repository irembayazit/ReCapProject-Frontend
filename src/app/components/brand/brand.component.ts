import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  allBrand: Brand;
  @Output() brandId = new EventEmitter<number>();
  
  constructor(private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
      this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  setCurrentBrand(){    
    this.brandId.emit(this.currentBrand?.brandId);
  } 


}
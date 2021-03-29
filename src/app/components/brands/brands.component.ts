import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  
  brands:Brand[] = [];

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

  UpdatePage(){
    this.toastrService.success("güncelleme sayfasına yonlendiriliyor");
  }
}

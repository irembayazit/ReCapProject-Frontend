import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  brandId:number;
  colorId:number;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  currentBrandId(event: any) {
    this.brandId=event;
  }

  currentColorId(event: any) {
    this.colorId=event;
  }

  filter() {
    console.log(this.colorId);    
    console.log(this.brandId);
    if (this.brandId && this.colorId){
      this.router.navigate(['car/brand/' + this.brandId + '/color/' + this.colorId]);     
    }
    else if (this.brandId){
      this.router.navigate(['car/brand/' + this.brandId]);      
    }
    else if (this.colorId){
      this.router.navigate(['car/color/' + this.colorId]);      
    }
    else{
      this.router.navigate(['car/']);
    } 
  }

}

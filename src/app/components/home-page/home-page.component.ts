import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  rentDate:Date;
  returnDate:Date;
  rentable:boolean = false;

  ngOnInit(): void {
  }

  getCurrentClass(){
    if(this.rentable){
      return "form-control is-valid"
    } 
    else{
      return "form-control"
    }
  }


}
 
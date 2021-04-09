import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  currentColor:Color;
  uzunluk:number;
  filterTextColor="";
  colorOption:number;
  @Output() colorId = new EventEmitter<number>();
  
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.uzunluk = this.colors.length;
    })
  }

  setCurrentColor(){    
    this.colorId.emit(this.currentColor?.colorId);
  } 

}

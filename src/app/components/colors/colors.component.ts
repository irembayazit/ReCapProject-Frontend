import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  colors:Color[] = [];

  constructor(private colorService:ColorService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
    this.colors = response.data;
  })
}

UpdatePage(){
  this.toastrService.success("güncelleme sayfasına yonlendiriliyor");
}

}

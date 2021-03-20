import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  constructor(private creditCardService:CreditCardService,
    private toastrService:ToastrService) { }

  nameSurname:string;
  CardNumber:string;
  GuvenlikKodu:string;
  creditCard:CreditCard;

  ngOnInit(): void {
  }

  
  Add(){
      this.creditCard = {NameSurname:this.nameSurname,CardNumber:this.CardNumber,CardCvv:this.GuvenlikKodu,Money:100}
      this.creditCardService.Add(this.creditCard).subscribe(response=>{
        console.log(response.success + "*******")
        this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
      })
    }

    

}

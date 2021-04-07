import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-registered-card',
  templateUrl: './registered-card.component.html',
  styleUrls: ['./registered-card.component.css']
})
export class RegisteredCardComponent implements OnInit {

  name:User;  
  creditCards:CreditCard[];
  constructor(private authService: AuthService,
    private localStorageService:LocalStorageService,
    private creditCardService:CreditCardService,
    private rentalService:RentalService,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()==true){     
      let email = this.localStorageService.getUser();
      console.log(email)
      this.getUser(email);
    }
  }

  getUser(email:string){  
    this.authService.getUser(email).subscribe(response=>{
      this.name = response.data;      
      this.cardControl(this.name.customerId);
    })
  }

  values:string[];
  cardControl(customerId:number){
    this.creditCardService.cardControl(customerId).subscribe(response=>{
      this.creditCards = response.data
      console.log(this.creditCards);
    })    
  }

  selectedValue(creditCard:CreditCard){
    console.log("secildi")
    console.log(creditCard)
  }

  rental(){    
    if(!this.rentalService.rentalCheckout){
      this.toastrService.error("Tarih bilgilerinizi giriniz")
    }
    else{      
      this.rentalService.addRental(this.rentalService._rental).subscribe(response=>{
        this.toastrService.success(response.message)             
      })
    }    
  }

}

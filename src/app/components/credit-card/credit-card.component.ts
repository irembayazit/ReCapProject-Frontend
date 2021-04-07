import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  creditCardForm : FormGroup;
  name:User;
  endDateMonths : number[] = []
  endDateYears : number[] = []

  constructor(private formBuilder:FormBuilder,
    private authService: AuthService,
    private localStorageService:LocalStorageService,
    private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private rentalService:RentalService,) { }

  ngOnInit(): void {
    this.createAddForm();
    if(this.authService.isAuthenticated()==true){     
      let email = this.localStorageService.getUser();
      console.log(email)
      this.getUser(email);
    }
  }

  getUser(email:string){  
    this.authService.getUser(email).subscribe(response=>{
      this.name = response.data;
      this.creditCardForm.patchValue({
        customerId: this.name.customerId,
      })
    })
    this.endDateMonths = Array.from({length: 12}, (v, k) => k + 1);
    this.endDateYears = Array.from({length: 100}, (v, k) => k + 1);
  }

  
  createAddForm(){
    this.creditCardForm = this.formBuilder.group({
      customerId : ["",Validators.required],
      nameSurname : ["",Validators.required],
      cardNumber : ["",Validators.required],
      cardCvv : ["",Validators.required],
      endDateMonth : ["",Validators.required],
      endDateYear : ["",Validators.required],
      money : [10000,Validators.required],
    })
  }

  question(){
    if(this.creditCardForm.valid){
      if(window.confirm('Would you like to save your credit card?')){
        this.cardRental();
      }
      else{
        this.rental();
      }
    }else{
      console.log(this.creditCardForm.value) 
      this.toastrService.error("Form is missing","Warning!")
    }    
  }

  cardRental(){    
    if(!this.rentalService.rentalCheckout){
      this.toastrService.error("Enter date information")
    }
    else{
      if(this.creditCardForm.valid){
        console.log(this.creditCardForm.value) 
        let creditCardModel = Object.assign({},this.creditCardForm.value)
        this.creditCardService.Add(creditCardModel).subscribe(response=>{  
          console.log("credi kart bilgileri kaydedildi")      

          this.rentalService.addRental(this.rentalService._rental).subscribe(response=>{
            console.log("Araç kiralandı") 
            this.toastrService.success(response.message)
          },responseError=>{
            this.toastrService.error(responseError.error.message);             
          })
          this.toastrService.success(response.message,"Operation");
          
        },responseError=>{
          if(responseError.error.Errors.length >0){
            console.log(responseError.error.Errors)
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Verification error");
            }
          }
        })
      }else{
        console.log(this.creditCardForm.value) 
        this.toastrService.error("Form is missing","Warning!")
      }      
    }
  }

  rental(){    
    if(!this.rentalService.rentalCheckout){
      this.toastrService.error("Enter date information")
    }
    else{      
      this.rentalService.addRental(this.rentalService._rental).subscribe(response=>{
        this.toastrService.success(response.message)             
      })
    }    
  }
}

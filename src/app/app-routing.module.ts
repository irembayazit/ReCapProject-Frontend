import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentalPageComponent } from './components/car-rental-page/car-rental-page.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

const routes: Routes = [
  {path : "" , pathMatch:"full" , component:CarComponent},
  {path : "car", component:CarComponent},
  {path : "car/brand/:brandId", component:CarComponent},
  {path : "car/color/:colorId", component:CarComponent},
  {path : "car/car-detail/:carId", component:CarDetailComponent},
  {path : "car/car-rental-page/:carId", component:CarRentalPageComponent},
  {path : "creditcard/:rental", component:CreditCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule {}

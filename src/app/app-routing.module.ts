import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdatesComponent } from './components/brand-updates/brand-updates.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentalPageComponent } from './components/car-rental-page/car-rental-page.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path : "" , pathMatch:"full" , component:CarComponent},
  {path : "car", component:CarComponent},
  {path : "car/brand/:brandId", component:CarComponent},
  {path : "car/color/:colorId", component:CarComponent},
  {path : "car/car-detail/:carId", component:CarDetailComponent},
  {path : "car/car-rental-page/:carId", component:CarRentalPageComponent},
  {path : "creditcard/:rental", component:CreditCardComponent},
  {path : "car/add", component:CarAddComponent , canActivate:[LoginGuard]},
  {path : "brand/add", component:BrandAddComponent},
  {path : "color/add", component:ColorAddComponent},
  {path : "car/car-update/:carId", component:CarUpdateComponent},
  {path : "brand/update/:brandId", component:BrandUpdatesComponent},
  {path : "color/update/:colorId", component:ColorUpdateComponent},
  {path : "brand/getall", component:BrandsComponent},
  {path : "color/getall", component:ColorsComponent},
  {path : "login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule {}

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
import { CustomerComponent } from './components/customer/customer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path : "" ,  component:HomePageComponent},
  {path : "car", component:CarComponent},
  {path : "car/brand/:brandId", component:CarComponent},
  {path : "car/color/:colorId", component:CarComponent},
  {path : "car/brand/:brandId/color/:colorId", component:CarComponent},
  {path : "car/car-detail/:carId", component:CarDetailComponent},
  {path : "car/car-rental-page/:carId", component:CarRentalPageComponent , canActivate:[LoginGuard]},
  {path : "car/add", component:CarAddComponent , canActivate:[LoginGuard]},
  {path : "brand/add", component:BrandAddComponent , canActivate:[LoginGuard]},
  {path : "color/add", component:ColorAddComponent , canActivate:[LoginGuard]},
  {path : "car/car-update/:carId", component:CarUpdateComponent , canActivate:[LoginGuard]},
  {path : "brand/update/:brandId", component:BrandUpdatesComponent , canActivate:[LoginGuard]},
  {path : "color/update/:colorId", component:ColorUpdateComponent , canActivate:[LoginGuard]},
  {path : "brand/getall", component:BrandsComponent},
  {path : "color/getall", component:ColorsComponent},
  {path : "login", component:LoginComponent},
  {path : "register", component:RegisterComponent},
  {path : "navi/:login", component:NaviComponent},
  {path : "profile", component:ProfileComponent},
  {path : "rental", component:RentalComponent},
  {path : "customer", component:CustomerComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule {}

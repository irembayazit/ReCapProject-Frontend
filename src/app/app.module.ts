import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterCarBrandPipePipe } from './pipe/filter-car-brand-pipe.pipe';
import { FilterBrandPipePipe } from './pipe/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipe/filter-color-pipe.pipe';

import {ToastrModule} from "ngx-toastr";
import { CarRentalPageComponent } from './components/car-rental-page/car-rental-page.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandUpdatesComponent } from './components/brand-updates/brand-updates.component';
import { ColorsComponent } from './components/colors/colors.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    FilterCarBrandPipePipe,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    CarRentalPageComponent,
    CarAddComponent,
    BrandAddComponent, 
    ColorAddComponent,
    CarUpdateComponent,
    CartSummaryComponent,
    BrandsComponent,
    BrandUpdatesComponent,
    ColorsComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

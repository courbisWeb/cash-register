import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DateComponent } from './components/date/date.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CommodityListComponent } from './components/commodity-list/commodity-list.component';
import { FormsModule } from '@angular/forms';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { AmountsComponent } from './components/amounts/amounts.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    HeaderComponent,
    CommodityListComponent,
    CashRegisterComponent,
    PaymentMethodComponent,
    AmountsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

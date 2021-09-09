import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICashRegister } from 'src/app/interfaces';
import { Commodity } from 'src/app/models';
import { CashRegisterEventService, CommodityEventService } from 'src/app/services';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit, OnDestroy {

  public commodityList: Array<ICashRegister>= new Array<ICashRegister>();

  private commodityEventServiceSubscription: Subscription;

  constructor(
    private commodityEventService: CommodityEventService,
    private cashRegisterEventService: CashRegisterEventService) { }

  ngOnInit(): void {
    console.log('CASH-REGISTER COMPONENT');
    this.commodityEventServiceSubscription= this.commodityEventService.getCommodityEmitter().subscribe(commodity=> {
      this.addCommodity(commodity);
    });

  }

  public addCommodity(commodity: Commodity): void {

    let flagExists: boolean= false;

    this.commodityList.forEach(c=> {
      if ( c.commodity.code == commodity.code ) {
        c.amount++;
        this.validateStock(c);
        c.subTotal= c.amount*c.commodity.price
        flagExists= true;
        this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);
        return;
      }
    });

    if ( !flagExists && commodity.stock> 0){
      this.commodityList.push({commodity:commodity, amount:1, subTotal: commodity.price});
    }
    this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);

  }

  public validateStock(commodity: ICashRegister): void {

    if ( commodity.amount > commodity.commodity.stock ) {
      console.warn('exceeds stock');
      this.commodityList.forEach(c=> {
        if ( c.commodity.code=== commodity.commodity.code ) {
          c.amount= commodity.commodity.stock;
          c.subTotal= c.amount*c.commodity.price
          this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);
          return;
        }
      });
    } else if ( commodity.amount<= 0 ) {
      this.commodityList.forEach(c=> {
        if ( c.commodity.code=== commodity.commodity.code ) {
          c.amount= 1;
          c.subTotal= c.amount*c.commodity.price
          this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);
          return;
        }
      });
    } else {
      this.commodityList.forEach(c=> {
        if ( c.commodity.code=== commodity.commodity.code ) {
          c.subTotal= c.amount*c.commodity.price
          this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);
          return;
        }
      });
    }
  }

  public remove(commodity: ICashRegister):void {
    this.commodityList.forEach((c,i)=> {
      if ( c.commodity.code=== commodity.commodity.code ) {
        this.commodityList.splice(i,1);
        this.cashRegisterEventService.cashRegisterEventEmmiter(this.commodityList);
        return;
      }
    })
  }

  ngOnDestroy(): void {
    if ( this.commodityEventServiceSubscription ) {
      this.commodityEventServiceSubscription.unsubscribe();
    }
  }

}

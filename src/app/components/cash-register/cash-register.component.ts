import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICashRegister } from 'src/app/interfaces';
import { Commodity } from 'src/app/models';
import { CommodityEventService } from 'src/app/services';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit, OnDestroy {

  public commodityList: Array<ICashRegister>= new Array<ICashRegister>();

  private commodityEventServiceSubscription: Subscription;

  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;

  constructor(private commodityEventService: CommodityEventService) { }

  ngOnInit(): void {
    console.log('CASH-REGISTER COMPONENT');
    this.commodityEventServiceSubscription= this.commodityEventService.getCommodityEmitter().subscribe(commodity=> {
      this.addCommodity(commodity);
    });

  }

  public addCommodity(commodity: Commodity): void {
    // this.commodityList.push(commodity);

    let flagExists: boolean= false;

    this.commodityList.forEach(c=> {
      if ( c.commodity.code == commodity.code ) {
        c.amount++;
        this.validateStock(c);
        c.subTotal= c.amount*c.commodity.price
        flagExists= true;
        return;
      }
    });

    if ( !flagExists && commodity.stock> 0){
      this.commodityList.push({commodity:commodity, amount:1, subTotal: commodity.price});
    }

  }

  public validateStock(commodity: ICashRegister): void {

    if ( commodity.amount > commodity.commodity.stock ) {
      console.warn('exceeds stock');
      this.commodityList.forEach(c=> {
        if ( c.commodity.code=== commodity.commodity.code ) {
          c.amount= commodity.commodity.stock;
          return;
        }
      });
    }

    if ( commodity.amount<= 0 ) {
      this.commodityList.forEach(c=> {
        if ( c.commodity.code=== commodity.commodity.code ) {
          c.amount= 1;
          return;
        }
      });
    }
  }

  public remove(commodity: ICashRegister):void {
    this.commodityList.forEach((c,i)=> {
      if ( c.commodity.code=== commodity.commodity.code ) {
        this.commodityList.splice(i,1);
      }
    })
  }

  ngOnDestroy(): void {
    if ( this.commodityEventServiceSubscription ) {
      this.commodityEventServiceSubscription.unsubscribe();
    }
  }

}

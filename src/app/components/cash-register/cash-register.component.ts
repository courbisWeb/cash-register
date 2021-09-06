import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Commodity } from 'src/app/models';
import { CommodityEventService } from 'src/app/services';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit, OnDestroy {

  public commodityList: Array<Commodity>= new Array<Commodity>();

  private commodityEventServiceSubscription: Subscription;

  constructor(private commodityEventService: CommodityEventService) { }

  ngOnInit(): void {
    console.log('CASH-REGISTER COMPONENT');
    this.commodityEventServiceSubscription= this.commodityEventService.getCommodityEmitter().subscribe(commodity=> {
      this.addCommodity(commodity);
    });

  }

  public addCommodity(commodity: Commodity): void {
    this.commodityList.push(commodity);
  }

  ngOnDestroy(): void {
    if ( this.commodityEventServiceSubscription ) {
      this.commodityEventServiceSubscription.unsubscribe();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICashRegister } from 'src/app/interfaces';
import { CashRegisterEventService } from 'src/app/services';

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {

  private CashRegisterEventServiceSubscription: Subscription;
  private commodityList: Array<ICashRegister>= new Array<ICashRegister>();

  public subTotal: number= 0;
  public total: number= 0;
  public iva: number= 0;


  constructor(private cashRegisterEventService: CashRegisterEventService) { }

  ngOnInit(): void {
    this.CashRegisterEventServiceSubscription= this.cashRegisterEventService.getCashRegisterEmitter().subscribe(commodityList=> {
      this.commodityList= commodityList;
      this.calculate();
    });
  }

  private calculate(): void {
    this.subTotal= 0;
    this.iva= 0;
    this.total= 0;

    this.commodityList.forEach(c=> {
      this.subTotal+= c.subTotal;
    });
    this.iva= this.subTotal*0.19;
    this.total= this.subTotal+ this.iva;
  }

}

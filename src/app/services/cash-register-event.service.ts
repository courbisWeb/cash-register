import { EventEmitter, Injectable } from '@angular/core';
import { ICashRegister } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterEventService {

  private cashRegisterEvent: EventEmitter<Array<ICashRegister>>= new EventEmitter<Array<ICashRegister>>();
  
  constructor() { }

  public cashRegisterEventEmmiter(cashRegisterList: Array<ICashRegister>): void {
    this.cashRegisterEvent.emit(cashRegisterList);
  }

  public getCashRegisterEmitter(): EventEmitter<Array<ICashRegister>> {
    return this.cashRegisterEvent;
  }

}

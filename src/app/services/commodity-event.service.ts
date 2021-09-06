import { EventEmitter, Injectable } from '@angular/core';
import { Commodity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommodityEventService {

  private commodityEvent: EventEmitter<Commodity>= new EventEmitter<Commodity>();
  
  constructor() { }

  public commodityEventEmmiter(commodity: Commodity): void {
    this.commodityEvent.emit(commodity);
  }

  public getCommodityEmitter(): EventEmitter<Commodity> {
    return this.commodityEvent;
  }

}

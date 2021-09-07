import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commodity } from 'src/app/models';
import { CommodityEventService } from 'src/app/services';

@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.scss']
})
export class CommodityListComponent implements OnInit {

  @Input() public commodityList: Array<Commodity>;
  @Output() public commoditySelectedEvent: EventEmitter<Commodity>= new EventEmitter<Commodity>();
  public commodityListFiltered: Array<Commodity>= new Array<Commodity>();
  public searchText: string= "";

  constructor(private commodityEventService: CommodityEventService) { }

  ngOnInit(): void {

    this.commodityListDummy();

  }

  private commodityListDummy(): void {
    this.commodityList= new Array<Commodity>();
    for ( let i= 0; i<20; i++ ) {
      const commodity: Commodity= new Commodity();
      commodity.code= 'A012345678'+i;
      commodity.name= 'Name example ' + i;
      commodity.price= 9990;
      commodity.supplier= 'Supplier example ' + i;
      commodity.type= 'Type example ' + i;
      commodity.stock= i;
      this.commodityList.push(commodity);
    }

    const commodity: Commodity= new Commodity();
      commodity.code= 'A999999999';
      commodity.name= 'Pastel de choclo ';
      commodity.price= 10500;
      commodity.supplier= 'La tía de la esquina';
      commodity.type= 'Alimento';
      commodity.stock= 90;
      this.commodityList.push(commodity);

      const commodity2: Commodity= new Commodity();
      commodity.code= 'A999999999';
      commodity.name= 'Ketchup añejado en roble curtido con las más finas cenizas del hermitaño';
      commodity.price= 10500;
      commodity.supplier= 'La tía de la esquina';
      commodity.type= 'Alimento';
      commodity.stock= 90;
      this.commodityList.push(commodity2);

    this.commodityListFiltered= this.commodityList;
  }

  public filter(): void {

    if ( this.searchText.length== 0 ) {

      this.commodityListFiltered= this.commodityList; 
      return;

    }

    this.commodityListFiltered= new Array<Commodity>();
    this.commodityList.forEach(commodity=> {
      if ( commodity.code.toUpperCase().includes(this.searchText.toUpperCase()) 
        || commodity.name.toUpperCase().includes(this.searchText.toUpperCase())) {
          this.commodityListFiltered.push(commodity);
        }
    })
  }

  public onClick(commoditySelected: Commodity): void {
    this.commodityEventService.commodityEventEmmiter(commoditySelected);
  }

}

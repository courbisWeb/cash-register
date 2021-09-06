import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  public hourDate: string;
  public date: string;

  constructor(
    private datePipe: DatePipe
  ) { 
    setInterval(() =>{
      const currentDate = new Date();
      this.date= this.datePipe.transform(currentDate, 'dd/MM/yyyy');
      this.hourDate = currentDate.toLocaleTimeString();
       }, 1000);
  }

  ngOnInit(): void {
  }

}

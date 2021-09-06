import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public addressStore: string= 'Store address, province, City, Country';
  @Input() public seller: string= 'FirstName LastName';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  img = 'https://media-exp1.licdn.com/dms/image/C560BAQHn404W692CMQ/company-logo_200_200/0/1531413102785?e=2159024400&v=beta&t=PH4beFERgT3rR2DFxF5Dx3vCRG4f-MRZaQJDzGr3ksY'

  constructor() { }

  ngOnInit(): void {
  }

}

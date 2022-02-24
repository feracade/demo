import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressCustomer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent implements OnInit {

  id = 0;

  constructor(private _customerService: CustomerService, 
              private toastr: ToastrService,
              private aRoute: ActivatedRoute,
              private router: Router) { 
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  addressesList: AddressCustomer[] = [];

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this._customerService.getAddressesList(this.id).subscribe(data=> {
      this.addressesList = data;
    }, error => {
      console.log(error);
    })
  }

  deleteAddress(addressId: any) {
    this._customerService.deleteAddress(this.id, addressId).subscribe(data=> {
      this.addressesList = data;
      this.toastr.error("Borrado con éxito", 'Upss..');
    }, error => {
      this.toastr.error(error.message, 'Upss..');
      console.log(error);
    })
  }

}

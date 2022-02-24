import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customersList: Customer[] = [];
  name: any;
  key: string  = 'id';
  reverse: boolean = false;
  p: number = 1;


  constructor(private _customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this._customerService.getCustomersList().subscribe(data=> {
      this.customersList = data;
    }, error => {
      console.log(error);
    })
  }

  Search(){
    if(this.name == ""){
      this.ngOnInit()
    }
    else{
      this.customersList = this.customersList.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      });
    }
  }

  sort(key: string) {
    this.key = key;
    this.reverse = ! this.reverse;
  }

  deleteCustomer(id: any){
    this._customerService.deleteCustomer(id).subscribe(data=> {
      this.customersList = data;
    }, error => {
      this.toastr.error(error.message, 'Upss..');
    })
  }

}

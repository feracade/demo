import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressCustomer, LocationAddress } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-edit-address',
  templateUrl: './create-edit-address.component.html',
  styleUrls: ['./create-edit-address.component.scss']
})
export class CreateEditAddressComponent implements OnInit {

  createAddress: FormGroup;
  actionMode = "Create";
  id = 0;
  customer: CustomerService | undefined;

  backURL = ""

  constructor(private fb: FormBuilder, 
              private _customerService: CustomerService, 
              private aRoute: ActivatedRoute,
              private router: Router
              ) { 
                    this.createAddress = this.fb.group({
                      address: ['', Validators.required],
                      coordinatesX: ['', Validators.required],
                      coordinatesY: ['', Validators.required],
                    })
                  this.id = +this.aRoute.snapshot.paramMap.get('id')!;

                  this.backURL = this.id > 0? "/address/" + this.id : "/"
                }

    ngOnInit(): void {
      this.isEdit();
    }
            

    isEdit(){
      if(this.id !==0){
        this.actionMode = "Edit";
        
        this._customerService.getAddress(this.id, +this.aRoute.snapshot.paramMap.get('idaddress')!).subscribe(data=> {
          this.createAddress.patchValue({
            id: data.id,
            address: data.address,
            coordinatesX: data.location.coordinates[0],
            coordinatesY: data.location.coordinates[1]
          })
        }, error => {
          console.log(error);
        })
  
        
      }
    }

    save() {

      const locationAddress: LocationAddress = {
        type: "Point",
        coordinates: [+this.createAddress.get('coordinatesX')?.value!, +this.createAddress.get('coordinatesY')?.value!]
      }

      const addressCustomer: AddressCustomer = {
        address: this.createAddress.get('address')?.value,
        location: locationAddress
      }

      if(this.id > 0){
        this._customerService.udpateCustomerAddress(this.id, +this.aRoute.snapshot.paramMap.get('idaddress')!, addressCustomer).subscribe(data => {
          this.router.navigate(['/']);
        }, error =>{
          console.log(error)
        })
      }
      else{
        this._customerService.saveCustomerAddress(+this.aRoute.snapshot.paramMap.get('id')!, addressCustomer).subscribe(data => {
          this.router.navigate(['/']);
        }, error =>{
          console.log(error)
        })
      }
   }
}

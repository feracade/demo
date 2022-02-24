import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
  styleUrls: ['./create-edit-customer.component.scss']
})
export class CreateEditCustomerComponent implements OnInit {

  createCustomer: FormGroup;
  actionMode = "Create";
  id = 0;
  customer: CustomerService | undefined;
  myimage: Observable<any> | undefined;
  imgBase64= "";

  constructor(private fb: FormBuilder, 
              private _customerService: CustomerService, 
              private aRoute: ActivatedRoute,
              private router: Router
              ) { 
    this.createCustomer = this.fb.group({
      name: ['', Validators.required],
      emailAddresses: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      estimatedBudget: ['', Validators.required],
      isPremium: ['', Validators.required],
      
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.isEdit();
  }

  save() {

     const customer: Customer = {
      name: this.createCustomer.get('name')?.value,
      dateOfBirth: this.createCustomer.get('dateOfBirth')?.value,
      estimatedBudget: this.createCustomer.get('estimatedBudget')?.value,
      isPremium: this.createCustomer.get('isPremium')?.value,
      emailAddresses: this.createCustomer.get('emailAddresses')?.value,
      base64Photo: this.imgBase64
    }

    if(this.id > 0){
      this._customerService.updateCustomer(this.id, customer).subscribe(data => {
        this.router.navigate(['/']);
      }, error =>{
        console.log(error)
      })
    }
    else{
      this._customerService.saveCustomer(customer).subscribe(data => {
        this.router.navigate(['/']);
      }, error =>{
        console.log(error)
      })
    }
    
  }

  isEdit(){
    if(this.id !==0){
      this.actionMode = "Edit";

      this._customerService.getCustomerPhoto(this.id).subscribe(data=> {
          this.imgBase64 = data.base64Photo
      }, error => {
        console.log(error);
      })
      
      this._customerService.getCustomer(this.id).subscribe(data=> {
        this.createCustomer.patchValue({
          id: data.name,
          name: data.name,
          emailAddresses: data.emailAddresses,
          dateOfBirth: data.dateOfBirth,
          estimatedBudget: data.estimatedBudget,
          isPremium: data.isPremium,
          imgBase64: this.imgBase64
        })
      }, error => {
        console.log(error);
      })

      
    }
  }

  onChange($event: Event) {
    const input = ($event.target as HTMLInputElement);

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.myimage.subscribe(data=> {
      this.imgBase64 = data;
    }, error => {
      console.log(error.message);
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
}

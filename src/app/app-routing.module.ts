import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';
import { CreateEditAddressComponent } from './components/create-edit-address/create-edit-address.component';

const routes: Routes = [
  { path: '', component: CustomersListComponent},
  { path: 'create', component: CreateEditCustomerComponent},
  { path: 'edit/:id', component: CreateEditCustomerComponent},
  { path: 'view/:id', component: ViewCustomerComponent},

  { path: 'address/:id', component: AddressesListComponent},
  { path: 'create/address/:id/detail/:idaddress', component: CreateEditAddressComponent},
  { path: 'edit/address/:id/detail/:idaddress', component: CreateEditAddressComponent},

  // { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';
import { CreateEditAddressComponent } from './components/create-edit-address/create-edit-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateEditCustomerComponent,
    CustomersListComponent,
    ViewCustomerComponent,
    AddressesListComponent,
    CreateEditAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressCustomer, Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private myAppUrl = 'http://localhost:5000/';
private myApiurl = 'customers/'
private myApiurlAddres = '/addresses/'

  constructor(private http: HttpClient) { }

  getCustomersList(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiurl)
  }

  deleteCustomer(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiurl + id)
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiurl + id)
  }

  getCustomerPhoto(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.myAppUrl + this.myApiurl + id + "/photo", {headers: headers})
  }

  saveCustomer(customer: Customer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(customer);
    return this.http.post(this.myAppUrl + this.myApiurl, body, { 'headers': headers})
  }

  updateCustomer(id: number, customer: Customer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(customer);
    return this.http.put(this.myAppUrl + this.myApiurl + id, body, { 'headers': headers})
  }

  getAddressesList(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiurl + id + this.myApiurlAddres)
  }

  getAddress(id: number, addressId: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiurl + id + this.myApiurlAddres + addressId)
  }

  deleteAddress(id: number, addressId: number): Observable<any> {
    const urlDelete = this.myAppUrl + this.myApiurl + id + this.myApiurlAddres + addressId;
    return this.http.delete(urlDelete)
  }

  saveCustomerAddress(id: number, addressCustomer: AddressCustomer): Observable<any> {
    const headers = { 'content-type': 'application/json'}

    const body = JSON.stringify(addressCustomer);

    return this.http.post(this.myAppUrl + this.myApiurl + id + this.myApiurlAddres, body, { 'headers': headers})
  }

  udpateCustomerAddress(id: number, idAddress: number, addressCustomer: AddressCustomer): Observable<any> {
    const headers = { 'content-type': 'application/json'}

    const body = JSON.stringify(addressCustomer);

    return this.http.put(this.myAppUrl + this.myApiurl + id + this.myApiurlAddres + idAddress, body, { 'headers': headers})
  }
}

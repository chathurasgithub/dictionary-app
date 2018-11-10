import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactMsg} from '../contact-msg';

@Injectable({
  providedIn: 'root'
})
export class ContactsubmissionService {

  _url='http://localhost:3000/contactSubmission';

  constructor(private _http:HttpClient) { }

  contactSubmission(contactMessage:ContactMsg){

      return this._http.post<any>(this._url,contactMessage)

  }

}

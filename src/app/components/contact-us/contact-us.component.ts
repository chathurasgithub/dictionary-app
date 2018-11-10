import { Component, OnInit } from '@angular/core';
import {ContactMsg} from '../../contact-msg';
import {ContactsubmissionService} from '../../services/contactsubmission.service';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  fullAddress="your address goes here";
  isSubmitted=false;
  isHidden=true;
  ContactMsgModel=new ContactMsg('','','','','');

  constructor(private _contactsubmissionService:ContactsubmissionService) { }

  btnHidden(){
    this.isHidden=true;
    this.isSubmitted=false;
  }

  onSubmit(){

    this._contactsubmissionService.contactSubmission(this.ContactMsgModel)
    .subscribe(
      data=> console.log('success !', data),
      error=> console.log('Error !', error)
    )

    this.isSubmitted=true;
    this.isHidden=false;
    

  
  }

  ngOnInit() {
  }

}

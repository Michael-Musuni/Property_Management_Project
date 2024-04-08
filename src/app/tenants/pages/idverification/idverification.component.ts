import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idverification',
  templateUrl: './idverification.component.html',
  styleUrls: ['./idverification.component.sass']
})
export class IdverificationComponent implements OnInit {
  additionalInfo: any = {
    documentType: "",
    firstName: "",
    lastName: "", 
    dateOfBirth: "",
    documentNumber: "",
    countryCode: "",
  };
  showAdditionalInfoForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
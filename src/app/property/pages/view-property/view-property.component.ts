import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyService } from '../../services/property.service';
import { PropertyManagementComponent } from '../property-management/property-management.component';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.sass']
})
export class ViewPropertyComponent implements OnInit {

  propertyDetails!: FormGroup;
  loading: boolean = false;
  i: number;
  tenant: any;
  isEditable: Boolean = true;
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  dialogData:any
  unitPanelState: boolean = false;
  displayedUnitColumns: string[] = ["unit", "maxOccupants","rent","deposit", "actions"]
  dataSource!: MatTableDataSource<any>;
  subscription!: Subscription;
  ownerDetails: FormGroup;
  subPropertiesForm: FormGroup
  // Declare a FormGroup for nextOfKin
  caretakerDetails: FormGroup
  unitsForm: FormGroup
  rentConfigForm: FormGroup
 
  submissionStatus: string = '';
  subPropertyPanelState: boolean = false;
  // Initialize the memberTableDataSource
  memberTableDataSource = new MatTableDataSource<any>([]);
  memberTableData: any[] = [];
  property: any;
  
  

  constructor(
    private  propertyService: PropertyService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<PropertyManagementComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {

    console.log("passed data", this.data)
    
    this.property = this.data.property;
    this.getUnits();
    this.initOwnerDetails(); 
    this.initCaretackerDetails();
    this.initUnitsForm();
    this.initRentConfigForm();
    this.updatePropertyForm();
  }
updatePropertyForm():void{
this.propertyDetails = this.fb.group({
  propertyName: [this.property.propertyName],
  location: [this.property.location],
  physicalAddress: [this.property.physicalAddress],
  category: [this.property.category],
  propertyType: [this.property.propertyType],
  description: [this.property.description],
});
}
  initOwnerDetails():void {
    this.ownerDetails = this.fb.group({
      ownerName: [this.property.propertyOwner.ownerName],
      phone: [this.property.propertyOwner.phone],
      ownerType: [this.property.propertyOwner.ownerType],
      email: [this.property.propertyOwner.email],
      idNumber: [this.property.propertyOwner.idNumber],
      kraPin: [this.property.propertyOwner.kraPin],
      physicalAddress: [this.property.propertyOwner.physicalAddress],
      accountNumber: [this.property.propertyOwner.accountNumber],
      paymentMethod: [this.property.propertyOwner.paymentMethod],

    });
  }
  initCaretackerDetails():void {
   this.caretakerDetails=this.fb.group({
    name: [this.property.caretaker.name ],
    phone: [this.property.caretaker.phone ],
   });
  }
  initUnitsForm():void {
    this.unitsForm=this.fb.group({
      unitName: [this.property.units.unitName ],
      maxOccupants: [this.property.units.maxOccupants ],
      deposit: [this.property.units.deposit ],
      rentAmount: [this.property.units.rentAmount ],
    });
    
  }
  initRentConfigForm():void {
    this.rentConfigForm=this.fb.group({
      rentDueDate: [this.property.rentConfig.rentDueDate ],
      latePaymentFee: [this.property.rentConfig.latePaymentFee ],
      managementCommission: [this.property.rentConfig.managementCommission ],
    });
  }
  get members() {
    return this.propertyDetails.get('members') as FormArray;
  }

 
  removeMember(index: number) {
    this.members.removeAt(index);
  }

  onCancel() {
    this.dialogRef.close();
  }

  addUnit() {
    console.log(this.unitsForm.value)
    this.propertyDetails.value.units.push(this.unitsForm.value)
    this.unitsForm.reset()
    this.getUnits()
  }
 
togglePanel() {
  this.subPropertyPanelState = !this.subPropertyPanelState;
  if (this.subPropertyPanelState) {
    
  }
}
togglePanel2() {
  this.unitPanelState = !this.unitPanelState;
  if (this.unitPanelState) {
    this.getUnits()
  }
}
getUnits() {
  // this.dataSource = new MatTableDataSource<any>(this.propertyDetails.value.units);
}

 
}

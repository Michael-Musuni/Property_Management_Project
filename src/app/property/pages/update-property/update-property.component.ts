import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { PropertyService } from '../../services/property.service';
import { PropertyManagementComponent } from '../property-management/property-management.component';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.sass']
})
export class UpdatePropertyComponent implements OnInit {
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
    this.property = {};
    this.getUnits();
    this.initOwnerDetails(); 
    this.initCaretackerDetails();
    this.initUnitsForm();
    this.initRentConfigForm();
    this.updatePropertyForm();
  }
updatePropertyForm():void{
this.propertyDetails = this.fb.group({
  propertyName: [this.property.propertyName, [Validators.required]],
  location: [this.property.location, [Validators.required]],
  physicalAddress: [this.property.physicalAddress, [Validators.required]],
  category: [this.property.category, [Validators.required]],
  propertyType: [this.property.propertyType, [Validators.required]],
  description: [this.property.description, [Validators.required]],
});
}
  initOwnerDetails():void {
    this.ownerDetails = this.fb.group({
      ownerName: [this.property.ownerName, [Validators.required]],
      phone: [this.property.phone, [Validators.required]],
      ownerType: [this.property.ownerType, [Validators.required]],
      email: [this.property.email, [Validators.required]],
      idNumber: [this.property.idNumber, [Validators.required]],
      kraPin: [this.property.kraPin, [Validators.required]],
      physicalAddress: [this.property.physicalAddress, [Validators.required]],
      accountNumber: [this.property.accountNumber, [Validators.required]],
      paymentMethod: [this.property.paymentMethod, [Validators.required]],

    });
  }
  initCaretackerDetails():void {
   this.caretakerDetails=this.fb.group({
    name: [this.property.name, [Validators.required]],
    phone: [this.property.phone, [Validators.required]],
   });
  }
  initUnitsForm():void {
    this.unitsForm=this.fb.group({
      unitName: [this.property.unitName, [Validators.required]],
      maxOccupants: [this.property.maxOccupants, [Validators.required]],
      deposit: [this.property.deposit, [Validators.required]],
      rentAmount: [this.property.rentAmount, [Validators.required]],
    });
    
  }
  initRentConfigForm():void {
    this.rentConfigForm=this.fb.group({
      rentDueDate: [this.property.rentDueDate, [Validators.required]],
      latePaymentFee: [this.property.latePaymentFee, [Validators.required]],
      managementCommission: [this.property.managementCommission, [Validators.required]],
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
  updateProperty() {
    this.loading = true;
    this.propertyService.updateProperty(this.property.any, this.propertyDetails.value).subscribe(
      (res) => {
        
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Tenant information updated successfully!');
        this.propertyDetails.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }
  addUnit() {
    console.log(this.unitsForm.value)
    this.propertyDetails.value.units.push(this.unitsForm.value)
    this.unitsForm.reset()
    this.getUnits()
  }
  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[a-zA-Z '-]/;
    if (!allowedChars.test(event.key)) {
        event.preventDefault();
    }
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

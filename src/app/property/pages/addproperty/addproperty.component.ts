import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyService } from '../../services/property.service';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { AmenitiesService } from 'src/app/configuration/services/amenities.service';
import { UtilitiesService } from 'src/app/configuration/services/utilities.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit {
  rentConfigForm: FormGroup;
  min: 1
  max: 100
  role: any
  loading = false;
  isLoading: Boolean;
  isdata: Boolean;
  data: any
  amenities: any
  utilities: any
  user: any
  subPropertyPanelState: boolean = false;
  unitPanelState: boolean = false;
  utilityPanelState: boolean = false;
  amenityPanelState: boolean = false;
  subscription!: Subscription;
  isEditable: Boolean = true;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["subPropertyName", "actions"]
  displayedUnitColumns: string[] = ["unit", "maxOccupants", "rent", "deposit", "actions"]
  displayedUtilitiesColumns: string[] = ["utility", "charge", "actions"]
  displayedAmenitiesColumns: string[] = ["amenity", "charge", "actions"]

  propertyDetails: FormGroup
  ownerDetails: FormGroup
  caretakerDetails: FormGroup
  subPropertiesForm: FormGroup
  unitsForm: FormGroup
  utilityForm: FormGroup
  amenityForm: FormGroup
  ID: any;
  Passport: any;




  constructor(
    // public dialogRef: MatDialogRef<PropertyManagementComponent>,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private propertyService: PropertyService,
    private amenityService: AmenitiesService,
    private utilityservice: UtilitiesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    
  ) {
    this.user = this.tokenStorageService.getUser()


    this.propertyDetails = this.fb.group({
      propertyName: ["", [Validators.required]],
      description: ["",],
      propertyType: ["", [Validators.required]],
      physicalAddress: ["",],
      location: ["", [Validators.required]],
      caretaker: [''],
      propertyOwner: [''],
      rentConfig: ["",],
      subProperties: this.fb.array([]), // FormArray for subproperties
      units: this.fb.array([]), // FormArray for units
      amenities: this.fb.array([]), // FormArray for units
      utilities: this.fb.array([]), // FormArray for units
      category: ["",]//lease,rent

    });
    this.ownerDetails = this.fb.group({
      ownerName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      email: [this.user.email,],
      ownerType: ["", [Validators.required]],
      idNumber: ["",],
      ownerIdType:["", [Validators.required]],
      idpassportNumber: ["",],
      kraPin: ['',],
      physicalAddress: ["", [Validators.required]],//lease,rent


    });
    this.rentConfigForm = this.fb.group({
      rentDueDate: ["", [Validators.required]],
      accountNumber: [""],
      accountName: [""],
      payBillNumber: [""],
      latePaymentFee: ["", [Validators.required]],
      paymentMethod: [""],
      managementCommission: ["",]
    })



    this.caretakerDetails = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      physicalAddress: ["", [Validators.required]],
    });
    this.subPropertiesForm = this.fb.group({
      subPropertyName: ['',],
    })
    this.unitsForm = this.fb.group({
      unitName: ['',],
      maxOccupants: ['', []],
      rentAmount: ['', Validators.required],
      deposit: ['', Validators.required]
    })
    this.utilityForm = this.fb.group({
      name: ['',],
      cost: ['',],
    })
    this.amenityForm = this.fb.group({
      name: ['',],
      cost: ['',],
    })

  }

  ngOnInit(): void {
    // Initialize the form with validation for managementCommission
    // this.rentConfigForm = this.fb.group({
    //   managementCommission: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    // });
  
  

    this.fetchAmenities();
    this.fetchUtilities();
    this.role = this.tokenStorageService.getUser().roles[0]


    console.log("Role: ", this.role)

  }

  togglePanel() {
    this.subPropertyPanelState = !this.subPropertyPanelState;
    if (this.subPropertyPanelState) {
      this.getSubProperties()
    }
  }
  togglePanel2() {
    this.unitPanelState = !this.unitPanelState;
    if (this.unitPanelState) {
      this.getUnits()
    }
  }
  togglePanel3() {
    this.utilityPanelState = !this.utilityPanelState;
    if (this.utilityPanelState) {
      this.getUtilities()
    }
  }
  togglePanel4() {
    this.amenityPanelState = !this.amenityPanelState;
    if (this.amenityPanelState) {
      this.getAmenities()
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[a-zA-Z '-]/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    this.loading = true;
    this.propertyDetails.value.caretaker = this.caretakerDetails.value
    this.propertyDetails.value.propertyOwner = this.ownerDetails.value
    this.propertyDetails.value.rentConfig = this.rentConfigForm.value
    this.isLoading = true;

    console.log("added units", this.propertyDetails.value)


    this.subscription = this.propertyService.registerProperty(this.propertyDetails.value).subscribe(res => {
      this.data = res

      console.log(this.data.message)
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", this.data.message);
      this.router.navigate(['/property/main'])
    })

  }
  fetchAmenities() {

    this.subscription = this.amenityService.getAmenities().subscribe(res => {
      this.data = res

      console.log(this.data.message)
      this.loading = false;
      this.amenities = this.data.entity
      console.log(this.amenities)
      // this.snackbar.showNotification("snackbar-success", this.data.message);
    })
  }
  fetchUtilities() {

    this.subscription = this.utilityservice.getUtilities().subscribe(res => {
      this.data = res

      console.log(this.data.message)
      this.loading = false;
      this.utilities = this.data.entity
      console.log(this.amenities)
      // this.snackbar.showNotification("snackbar-success", this.data.message);
    })
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.readExcel(file);
  }

  readExcel(file: File): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      
      // Convert excel data to JSON
      const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // Remove the header row
      if (excelData.length > 0) {
        excelData.shift(); // Remove the first row
      }

      this.dataSource = new MatTableDataSource<any>(excelData)
      console.log("data received from excel",excelData);

      this.patchFormArray(excelData)
      
    };

    reader.readAsArrayBuffer(file);
  }

    // Function to patch FormArray with excel data
  patchFormArray(data: any[]): void {
      data.forEach(item => {
        const group: FormGroup = this.createUnitsFormGroup(item);
        console.log("One item ", group)
        this.propertyDetails.value.units.push(group.value);
      });
  }

  createUnitsFormGroup(item: any): FormGroup{
    return this.fb.group({
      unitName: [item.unitName, []],
      maxOccupants: [item.maxOccupants, []],
      rentAmount: [item.rentAmount, Validators.required],
      deposit: [item.deposit, Validators.required]
    })
  }

  getSubProperties() {
    this.dataSource = new MatTableDataSource<any>(this.propertyDetails.value.subProperties);
  }
  removeSubProperty(row, index) {
    const subpropertyId = row.id; // Replace 'id' with the actual property ID property
    console.log(`Deleting subproperty with ID ${subpropertyId} at index ${index}`);
    this.propertyDetails.value.subProperties.splice(index);
    this.getSubProperties();
  }


  addSubProperty() {
    console.log(this.subPropertiesForm.value)
    this.propertyDetails.value.subProperties.push(this.subPropertiesForm.value)
    this.subPropertiesForm.reset()
    this.getSubProperties()

  }

  getUnits() {
    this.dataSource = new MatTableDataSource<any>(this.propertyDetails.value.units);
  }
  getUtilities() {
    this.dataSource = new MatTableDataSource<any>(this.propertyDetails.value.utilities);
  }
  getAmenities() {
    this.dataSource = new MatTableDataSource<any>(this.propertyDetails.value.amenities);
  }
  removeUnits(row, index) {
    const unitId = row.id; // Replace 'id' with the actual property ID property
    console.log(`Deleting unit with ID ${unitId} at index ${index}`);
    this.propertyDetails.value.units.splice(index);
    this.getUnits();
  }
  removeAmenities(row, index) {
    const unitId = row.id; // Replace 'id' with the actual property ID property
    console.log(`Deleting amenity with ID ${unitId} at index ${index}`);
    this.propertyDetails.value.amenities.splice(index);
    this.getUnits();
  }

  addUnit() {
    console.log(this.unitsForm.value)
    this.propertyDetails.value.units.push(this.unitsForm.value)
    this.unitsForm.reset()
    this.getUnits()
  }

  addUtility() {
    console.log(this.utilityForm.value)
    this.propertyDetails.value.utilities.push(this.utilityForm.value)
    this.utilityForm.reset()
    this.getUtilities()

  }
  addAmenity() {
    console.log(this.amenityForm.value)
    this.propertyDetails.value.amenities.push(this.amenityForm.value)
    this.amenityForm.reset()
    this.getAmenities()

  }
  removeUtilities(row, index) {
    const unitId = row.id; // Replace 'id' with the actual property ID property
    console.log(`Deleting utility with ID ${unitId} at index ${index}`);
    this.propertyDetails.value.utilities.splice(index);
    this.getUtilities();
  }


}
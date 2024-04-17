// Import necessary Angular modules and classes
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { TenantService } from '../tenant.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { Router } from '@angular/router';
import { IdverificationComponent } from '../idverification/idverification.component';
import { PropertyService } from 'src/app/property/services/property.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.sass'],
})
export class AddTenantComponent implements OnInit {
  // Declare your FormGroup and any other necessary properties
  tenantForm: FormGroup;
  loading: boolean = false;
  i: number;
  tenantData: any;
  data: any
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  dialogData: any
  units: any
  
  


  // Declare a FormGroup for members
  membersForm: FormGroup;

  // Declare a FormGroup for nextOfKin
  nextOfKinForm: FormGroup

  submissionStatus: string = '';

  // Initialize the memberTableDataSource
  memberTableDataSource = new MatTableDataSource<any>([]);
  memberTableData: any[] = [];



  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private tenant: TenantService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private router: Router,


  ) {


    // Initialize your form in the constructor
    this.tenantForm = this.fb.group({
      // form controls for tenant
      tenantName: ['', Validators.required],
      tenantPhoneNumber: ['', Validators.required],
      identificationType: ['', [Validators.required]],

      identificationNumber: ['',],
      tenantEmailAddress: ['',],
      tenantOccupation: [''],


      // Form controls for members moving in
      members: this.fb.array([]), // Initialize an empty form array for members

      // ... other form controls

      file:  ['', ],// Add this line for file upload

    });
    // Initialize the nextOfKinForm 
    this.nextOfKinForm = fb.group({

      // nextOfKinForm controls
      nextOfKinName: [''],
      nextOfKinIdNumber: [''],
      nextOfKinPhoneNumber: [''],
      nextOfKinEmailAddress: ['', Validators.email],
      nextOfKinRelationship: [''],
    })



    // Initialize the membersForm 
    this.membersForm = this.fb.group({

      // Form controls for members moving in
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      idNumber: [''],
    });
  }

  ngOnInit(): void {
    //
    // Additional initialization
  }
  

  // Method to handle file changes
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.["string"];

    // Update the 'fileUpload' form control value
    this.tenantForm.patchValue({
      file: file,
    });

    // ... other logic
  
  }
  onIDChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.idFile = reader.result;
        this.tenantForm.controls.file.setValue(this.idFile);
        this.imageSrc = reader.result as string;
        this.id = reader.result;
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }
  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[a-zA-Z '-]/;
    if (!allowedChars.test(event.key)) {
        event.preventDefault();
    }
}

  // Method to add a new g
  addTenant() {
    this.submitMembersFromTable();
    this.tenantForm.value.members.push(this.membersForm.value);
    this.tenantForm.value.nextOfKin = this.nextOfKinForm.value
    console.log('Tenant details:', this.tenantForm.value);

    this.tenant.addTenant(this.tenantForm.value).subscribe({
      next: (response) => {
        console.log('Response:', response);

        // Add logic to handle successful submission here, e.g., showing a success message
        this.submissionStatus = response.message;
        this.snackbar.showNotification("snackbar-success", response.message);
        this.router.navigate(['/tenants/manage'])
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Add logic to handle errors, e.g., showing an error message to the user
        this.submissionStatus = error;
        this.snackbar.showNotification("snackbar-danger", error);
      }
    });
    console.log('Members details:', this.membersForm.value);
  }

  // Method to handle cancellation
  onCancel() {
    // Reset form fields
    this.tenantForm.reset();
    // Clear the 'members' FormArray
    this.members.clear();
  }

  // method to access the 'members' form array
  get members(): FormArray {
    return this.tenantForm.get('members') as FormArray;
  }

  getMember(index: number): AbstractControl {
    return this.members.at(index);
  }

  addMemberToTable() {
    const memberData = this.membersForm.value;
    this.memberTableData.push(memberData);

    // Create a new form group for the member and push it to the 'members' form array
    const memberFormGroup = this.fb.group({
      name: [memberData.name, Validators.required],
      relationship: [memberData.relationship, Validators.required],
      idNumber: [memberData.idNumber],
    });

    this.members.push(memberFormGroup);
    // Update the member table data source
    this.memberTableDataSource.data.push(memberFormGroup.value);

    // Update the table data source
    this.memberTableDataSource.data = [...this.memberTableDataSource.data];

   

  }

  // New method to submit member table data to the 'members' form array
  submitMembersFromTable() {
    // Clear existing items in 'members' form array
    while (this.members.length !== 0) {
      this.members.removeAt(0);
    }

    // Add each item from 'memberTableDataSource' to 'members' form array
    this.memberTableDataSource.data.forEach(member => {
      this.members.push(this.fb.group(member));
    });
  }
  // Method to add a new member to the 'members' form array
  addMember() {
    const memberGroup = this.fb.group({
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      idNumber: [''],
    });

    this.members.push(memberGroup);
   
  }

  // Method to remove a member from the 'members' form array
  removeMember(index: number): void {
    this.members.removeAt(index);
    
  }

  // Helper method to format date controls
  private formatDateControls(controlNames: string[]): void {
    controlNames.forEach((controlName) => {
      const control = this.tenantForm.get(controlName);
      if (control.value) {
        control.setValue(this.datePipe.transform(control.value, 'yyyy-MM-dd'));
      }
    });
  }

  // Getter for easy access to form controls
  get tenantFormControls() {
    return this.tenantForm.controls;
  }

  getMemberControl(index: number): AbstractControl {
    return this.members.at(index);
  }

  verify() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(IdverificationComponent, dialogConfig)
  }


}
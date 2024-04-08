import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormArray,AbstractControl } from '@angular/forms';
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
import { TenantManagementComponent } from '../tenant-management/tenant-management.component';
import { AddTenantComponent } from '../add-tenant/add-tenant.component';
@Component({
  selector: 'app-updatetenant',
  templateUrl: './updatetenant.component.html',
  styleUrls: ['./updatetenant.component.sass']
})
export class UpdatetenantComponent implements OnInit {
  senior: any;
onIDChange($event: any) {
throw new Error('Method not implemented.');
}
addMemberToTable() {
throw new Error('Method not implemented.');
}
  tenantForm: FormGroup;
  loading: boolean = false;
  i: number;
  tenant: any;
  
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  dialogData:any
  units:any
 
  
  // Declare a FormGroup for members
  membersForm: FormGroup;

  // Declare a FormGroup for nextOfKin
  nextOfKinForm: FormGroup

  submissionStatus: string = '';

  // Initialize the memberTableDataSource
  memberTableDataSource = new MatTableDataSource<any>([]);
  memberTableData: any[] = [];


  constructor(
    private  tenantService: TenantService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TenantManagementComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("passed information ", this.data)
    this.tenant = this.data.tenant
    console.log("passed information ", this.tenant)

    this.updateTenantForm();
  }


  updateTenantForm(): void {
    this.initNextOfKinForm();
    this.initMembersForm();
    this.tenantForm = this.fb.group({
      id: [this.tenant.id, [Validators.required]],
      tenantName: [this.tenant.tenantName, [Validators.required]],
      tenantPhoneNumber: [this.tenant.tenantPhoneNumber, [Validators.required]],
      tenantEmailAddress: [this.tenant.tenantEmailAddress],
      identificationType: [this.tenant.identificationType, [Validators.required]],
      identificationNumber: [this.tenant.identificationNumber, [Validators.required]],
      tenantOccupation: [this.tenant.tenantOccupation],
      members: this.fb.array([]), // FormArray for members
      nextOfKin: this.nextOfKinForm
    });
  }

  initNextOfKinForm(): void {
    this.nextOfKinForm = this.fb.group({ // FormGroup for nextOfKin
      nextOfKinName: [this.tenant.nextOfKin.nextOfKinName, [Validators.required]],
      nextOfKinIdNumber: [this.tenant.nextOfKin.nextOfKinIdNumber, [Validators.required]],
      nextOfKinEmailAddress: [this.tenant.nextOfKin.nextOfKinEmailAddress, [Validators.required]],
      nextOfKinRelationship: [this.tenant.nextOfKin.nextOfKinRelationship, [Validators.required]],
      nextOfKinPhoneNumber: [this.tenant.nextOfKin.nextOfKinPhoneNumber, [Validators.required]]
    })
  }

  initMembersForm(): void {
    this.membersForm = this.fb.group({
      name: [this.tenant.members.name, [Validators.required]],
      relationship: [this.tenant.members.relationship, [Validators.required]],
      idNumber: [this.tenant.members.idNumber, [Validators.required]],
    });
  }




  get members() {
    return this.tenantForm.get('members') as FormArray;
  }

 
  removeMember(index: number) {
    this.members.removeAt(index);
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateTenant() {
    this.loading = true;
    // Update the backend service call to include members and nextOfKin data

    console.log("n of kin ", this.tenantForm.get('nextOfKin').value)
    console.log("n of kin ", this.tenantForm.get('members').value)


    this.tenantService.updateTenant(this.tenant.id, this.tenantForm.value).subscribe(
      (res) => {
        
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Tenant information updated successfully!');
        this.tenantForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }

  

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.data = {
      user: ''
    };
    const dialogRef = this.dialog.open(TenantManagementComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.senior = result;
      this.tenantForm.patchValue({
        reportingTo: this.senior
      });
    });
  }

}



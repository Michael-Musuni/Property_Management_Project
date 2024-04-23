import { Component, Inject, OnInit } from '@angular/core';
import { TenantManagementComponent } from '../tenant-management/tenant-management.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-view-tenant',
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.sass']
})
export class ViewTenantComponent implements OnInit {
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
      id: [this.tenant.id ],
      tenantName: [this.tenant.tenantName ],
      tenantPhoneNumber: [this.tenant.tenantPhoneNumber ],
      tenantEmailAddress: [this.tenant.tenantEmailAddress],
      identificationType: [this.tenant.identificationType ],
      identificationNumber: [this.tenant.identificationNumber ],
      tenantOccupation: [this.tenant.tenantOccupation],
      members: this.fb.array([]), // FormArray for members
      nextOfKin: this.nextOfKinForm
    });
  }

  initNextOfKinForm(): void {
    this.nextOfKinForm = this.fb.group({ // FormGroup for nextOfKin
      nextOfKinName: [this.tenant.nextOfKin.nextOfKinName ],
      nextOfKinIdNumber: [this.tenant.nextOfKin.nextOfKinIdNumber ],
      nextOfKinEmailAddress: [this.tenant.nextOfKin.nextOfKinEmailAddress ],
      nextOfKinRelationship: [this.tenant.nextOfKin.nextOfKinRelationship ],
      nextOfKinPhoneNumber: [this.tenant.nextOfKin.nextOfKinPhoneNumber ]
    })
  }

  initMembersForm(): void {
    this.membersForm = this.fb.group({
      name: [this.tenant.members.name ],
      relationship: [this.tenant.members.relationship ],
      idNumber: [this.tenant.members.idNumber ],
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


    this.tenantService.viewTenant(this.tenant.id, this.tenantForm.value).subscribe(
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
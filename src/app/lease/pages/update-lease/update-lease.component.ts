import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { PropertyService } from 'src/app/property/services/property.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from 'src/app/tenants/pages/tenant.service';
import { LeaseService } from '../../service/lease.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-lease',
  templateUrl: './update-lease.component.html',
  styleUrls: ['./update-lease.component.sass']
})
export class UpdateLeaseComponent implements OnInit {
  Leaseform: FormGroup;
  chargesForm: FormGroup
  loading: boolean;
  tenantId: string;
  propertyId:string;
  propertyData:string;
  // tenantName: string;
  tenantData: any;
  property: any;
  // data: any;
  dialogData: any
  subscription: Subscription;
  units: any
  startDate: string;
  endDate: string;
  // Initialize the FormArray
  chargesArray = this.fb.array([]);

  selectedValue: any
  chargesfetched: any

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private route: ActivatedRoute,
    private tenantService: TenantService,
    private propertyService: PropertyService,
    private leaseService: LeaseService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tenantId = this.route.snapshot.paramMap.get('id');
    console.log("Tenant Id ", this.tenantId);
    this.propertyId =this.route.snapshot.paramMap.get('id');
    console.log("Property Id", this.propertyId);
  }
  ngOnInit() {
    this.tenantData = this.data.data
    console.log("data received ", this.tenantData)
    this.initializeForm();
    this.getTenantById(this.data);

  }

 submit() {
    const formData = this.Leaseform.value;
    console.log("formdata", formData);
    formData.tenant = this.tenantData
    formData.startDate = this.formatDate(formData.startDate);
    formData.endDate = this.formatDate(formData.endDate);
    console.log("My Data ", this.Leaseform.value)

    const body = this.updateBody(formData)
    this.subscription = this.leaseService.updateContract(body).subscribe({
      next: ((res) => {
        console.log("My response ", res)
        this.snackbar.showNotification("snackbar-success", this.data.message);
        this.router.navigate(["/leasing/lease"])
      })
    
    })
  }

  getTenantById(tenantId) {
    this.loading = true;
    this.subscription = this.tenantService.getTenantById(tenantId).subscribe(
      (res) => {
        this.loading = false;
        this.tenantData = res.entity;

        // Initialize the form after fetching all required data
        this.initializeForm();
        (err) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', err);
        };
      });
  }
initializeForm() {
    this.chargesArray = this.fb.array([]);
    // this.getChargesPerProperty(this.dialogData.data.id);


    this.Leaseform = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: ['', Validators.required],
      monthlyRent: ['', [Validators.required]],
      deposit: ['', [Validators.required]],
      termsAndConditions: ['',],
      tenant: [''],
      propertyId: [''],
      tenantName: [this.tenantData?.tenantName],
      tenantPhoneNo: [this.tenantData?.tenant.tenantPhoneNumber],
      propertyOwner: [''],
      ownerName: [''],
      ownerPhoneNo: [''],
      propertyName: [this.tenantData?.charges.propertyName],
      propertyLocation: [''],
      unitName: [this.tenantData?.tenant.unitName],
      unit: [],
      charges: this.chargesArray,
     
      latePaymentFee: [''],
      rentDueDate: [''],
      paymentPeriod: ['', [Validators.required]],

    });
  }

pickProperty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(PropertyLookupComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.Leaseform.patchValue({
        property: this.dialogData.data,
        propertyId: this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName,
        ownerName: this.dialogData.data.propertyOwner.ownerName,
        ownerPhoneNo: this.dialogData.data.propertyOwner.phone,
        rentDueDate: this.dialogData.data.rentConfig.rentDueDate,
        latePaymentFee: this.dialogData.data.rentConfig.latePaymentFee,
        propertyOwner: this.dialogData.data.propertyOwner

      });
      this.units = this.getUnitsPerProperty("VACANT", this.dialogData.data.id);
      this.getChargesPerProperty(this.dialogData.data.id)

    });

  }
  getUnitsPerProperty(status, propertyId) {
    this.propertyService.getUnits(status, propertyId).subscribe(
      (res) => {
        this.loading = false;
        this.data = res
        this.units = this.data.entity
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
    return this.units;

  }
  getChargesPerProperty(propertyId) {
    this.propertyService.getCharges(propertyId).subscribe(
      (res) => {
        this.loading = false;
        this.data = res
        this.chargesfetched = this.data.entity;
        // Clear existing charges in the form array
        while (this.chargesArray.length !== 0) {
          this.chargesArray.removeAt(0);
        }
        // Populate the charges in the form array
        this.chargesfetched.forEach((charge) => {
          const chargeGroup = this.fb.group({
            chargeName: [charge.name],
            chargeAmount: [charge.cost],
          });

          this.chargesArray.push(chargeGroup);
        });
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }


  onUnitChange(event: any): void {
    this.selectedValue = event.value;
    console.log('Selected Unit:', this.selectedValue);
    this.Leaseform.patchValue({
      monthlyRent: this.selectedValue.rentAmount,
      deposit: this.selectedValue.deposit,
      unitName: this.selectedValue.unitName,
      unit: this.selectedValue
    });


  }
  getChargeFormGroup(index: number): FormGroup {
    return this.chargesArray.at(index) as FormGroup;
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }
 

    return `${year}-${month}-${day}`;
  }
  onCancel() {
    // this.dialogRef.close();
  }

  updateBody(data: any) {
    let body = {
      endDate: data.endDate,
      rentDueDate: data.rentDueDate,
      unit: data.unit,
      tenantPhoneNo: data.tenantPhoneNo,
      monthlyRent: data.monthlyRent,
      renewalStatus: data.renewalStatus,
      createdDate: data.createdDate
    };
    return  body; 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/property/services/property.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from 'src/app/tenants/pages/tenant.service';
import { LeaseService } from '../../service/lease.service';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportoptionsComponent } from '../reportoptions/reportoptions.component';

@Component({
  selector: 'app-leaseform',
  templateUrl: './leaseform.component.html',
  styleUrls: ['./leaseform.component.scss']
})
export class LeaseformComponent implements OnInit {
  Leaseform: FormGroup;
  chargesForm: FormGroup
  loading: boolean;
  tenantId: string;
  propertyId:string;
  propertyData:string;
  tenantName: string;
  tenantData: any;
  property: any;
  data: any;
  dialogData: any
  subscription: Subscription;
  units: any
  startDate: String;
  endDate: String;
  
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
    
  ) {
    this.tenantId = this.route.snapshot.paramMap.get('id');
    console.log("Tenant Id ", this.tenantId);
    this.propertyId =this.route.snapshot.paramMap.get('id');
    console.log("Property Id", this.propertyId);
  }
  ngOnInit() {
    // You can perform any additional initialization here
    // Example in ngOnInit

    this.getTenantById(this.tenantId);
    console.log("Tenant Details ", this.tenantData)

    //  this.getPropertyById(this.propertyId);
    //  console.log("Property Details",this.propertyData)

  }

 
  submit() {
    const formData = this.Leaseform.value;
  
    // Format date fields if needed
    formData.startDate = this.formatDate(formData.startDate);
    formData.endDate = this.formatDate(formData.endDate);
  
    // Make sure 'this.tenantData' is correctly defined
    formData.tenant = this.tenantData;
  
    console.log("Form Data:", formData);
  
    this.subscription = this.leaseService.newContract(formData).subscribe({
      next: (res) => {
        console.log("Response:", res);
        // Assuming 'data' is part of the response, adjust accordingly
        this.snackbar.showNotification("snackbar-success", res.message || 'Contract created successfully');
        this.router.navigate(["/leasing/lease"]);
      },
      error: (err) => {
        console.error("Error:", err);
        this.snackbar.showNotification("snackbar-error", "Failed to submit the form. Please try again.");
        // Handle error appropriately, e.g., display an error message
      }
    });
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
      tenantName: [this.tenantData.tenantName],
      tenantPhoneNo: [this.tenantData.tenantPhoneNumber],
      propertyOwner: [''],
      ownerName: [''],
      ownerPhoneNo: [''],
      propertyName: [this.tenantData.propertyName],
      propertyLocation: [''],
      unitName: [''],
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
    const dialogRef = this.dialog.open(
      PropertyLookupComponent,
      dialogConfig
    );
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
  
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { TenantManagementComponent } from '../tenant-management/tenant-management.component';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenantpayments',
  templateUrl: './tenantpayments.component.html',
  styleUrls: ['./tenantpayments.component.sass']
})
export class TenantpaymentsComponent implements OnInit {
  optionsForm: FormGroup;
  options: string[] = ['payments per tenant'];
  monthForm: FormGroup;
  dateForm: FormGroup;
  selectedStartDate: Date;
  selectedEndDate: Date;
  maxEndDate = new Date();
  minStartDate: Date;
  filteredOptions: Observable<string[]>;


  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  filteredMonths: Observable<string[]>;
  years: string[] = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];


  tenantNamesOptions: string[];
  filteredTenantNames: Observable<string[]> = new Observable<string[]>();
  TenantService: any;
  TenantNamesOptions: any;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TenantManagementComponent>,
    private propertyService: TenantService) { }

  ngOnInit(): void {
    this.optionsForm = this.formBuilder.group({
      reportType: ["", Validators.required],
      tenantName: ["", Validators.required]
    });

    this.filteredOptions = this.optionsForm.get("reportType")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredTenantNames = this.optionsForm.get("tenantName")?.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.TenantService.getTenants().pipe(
        map((res: any) => {
          this.TenantNamesOptions = res.entity.map((entity: any) => entity.tenantName);
          return this._filterTenantNames(value || '');
        })
      ))
    ) as Observable<string[]>;
  }
  _filterTenantNames(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase().trim(); // Trim any leading or trailing spaces
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filtertenantNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tenantNamesOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  public downloadtenantpayments() {
    // Add your download logic here
    const reportType = this.optionsForm.value.reportType;
    const tenantName = this.optionsForm.value.tenantName;
    console.log("tenant name", tenantName)
    if (reportType === "Payments per tenant") {
      alert("Download will start shortly...");
      console.log("tenant name", tenantName)
      this.TenantService.downloadtenantpaymentsReport(tenantName).subscribe({
        next: ((res) => {

          console.log("response", res);
          const blob = new Blob([res], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = `Report_${tenantName}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.dialogRef.close();

        }),
        error: ((error) => {
          console.log("error", error);
          this.dialogRef.close();

        }),
        complete: (() => { })
      })
    }
    if (reportType === "Terminated contracts") { }
  }


}
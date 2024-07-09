import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { TenantManagementComponent } from '../tenant-management/tenant-management.component';
import { TenantService } from '../tenant.service';
import { MatTableDataSource } from '@angular/material/table';
import { mergeMap } from 'rxjs/operators';
import { TenantlookupComponent } from '../tenantlookup/tenantlookup.component';



@Component({
  selector: 'app-tenantpayments',
  templateUrl: './tenantpayments.component.html',
  styleUrls: ['./tenantpayments.component.sass']
})
export class TenantpaymentsComponent implements OnInit {

  optionsForm: FormGroup;
  options: string[] = ['Payments per tenant'];
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
  TenantService: any;
  filteredTenantNames: Observable<string[]> = new Observable<string[]>();
  isLoading: boolean;
  data: any;
  dataSource: any;
  paginator: any;
  tenants: any;
  dialogData: any

constructor(
  private dialog: MatDialog,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<TenantManagementComponent>,
  private tenantService: TenantService) { }

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
      mergeMap(value => this.TenantService.getTenant().pipe(
        map((res: any) => {
          this.tenantNamesOptions = res.entity.map((entity: any) => entity.tenantName);
          return this._filterTenantNames(value || '');
        })
      ))
    )as Observable<string[]>;
  }

  private _filterTenantNames(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase().trim(); // Trim any leading or trailing spaces
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectTenant() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(
      TenantlookupComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.optionsForm.patchValue({

        tenantName: this.dialogData.data.tenantName

      });
      
    });

  }

  getData() {
    
    this.isLoading = true
    
    this.tenantService.getTenant().subscribe(res => {
      this.data = res

      this.isLoading = false
      if (res.entity) {
        
        this.tenants = res.entity
     

      } else {
        this.isLoading = false
     
        this.dataSource = new MatTableDataSource<any>(this.data);
      }

    },err=>{
        this.isLoading = false
        
        this.dataSource = new MatTableDataSource<any>(this.data);
    })
  }

  public downloadtenantpayments() {
    // Add your download logic here
    const reportType = this.optionsForm.value.reportType;
    const propertyName = this.optionsForm.value.propertyName;
    console.log("property name", propertyName)
    if (reportType === "Payments per tenant") {
      alert("Download will start shortly...");
      console.log("property name", propertyName)
      this.TenantService.downloadtenantpaymentsReport(propertyName).subscribe({
        next: ((res) => {
      
          console.log("response", res);
          const blob = new Blob([res], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = `Report_${propertyName}.pdf`;
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
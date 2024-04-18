import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../tenant.service';
import { Router } from '@angular/router';
import { ReportOptionsComponent } from 'src/app/property/pages/report-options/report-options.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportoptionsComponent } from '../reportoptions/reportoptions.component';
import { UpdatetenantComponent } from '../updatetenant/updatetenant.component';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { DeleteComponent } from '../delete/delete.component';
import { ViewTenantComponent } from '../view-tenant/view-tenant.component';
@Component({
  selector: 'app-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.sass']
})

export class TenantManagementComponent implements OnInit {


  data: any;
  role :string
  selectedDate: string; // Selected date from the date picker
    today: Date = new Date(); // Today's date
    activeTenantsForSelectedDate: number; // Number of active tenants for the selected date



  constructor(
    private tenantService: TenantService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    

  ) { }
  subscription!: Subscription
  isLoading: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['tenantName', 'tenantPhoneNumber', 'tenantIdNumber', 'unit', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  tenantsOnboardedData = [{ data: [], label: 'Tenants Onboarded' }];
  tenantsOnboardedLabels = ['January', 'February', 'March', 'April'];
  tenantsOnboardedOptions = { responsive: true };

  ngOnInit(): void {
    this.fetchTenantData();
    this.fetchOnboardedTenantsData();
    this.role = this.tokenStorage.getUser()?.roles[0];
      // Initialize selectedDate with today's date
      this.selectedDate = this.today.toISOString().split('T')[0];

      // Calculate active tenants for the selected date
      this.calculateActiveTenantsForSelectedDate();
    
  }
  onDateChange(): void {
    // Calculate active tenants for the newly selected date
    this.calculateActiveTenantsForSelectedDate();
}

calculateActiveTenantsForSelectedDate(): void {
    // Perform logic to calculate active tenants for the selected date
    // Assign the result to activeTenantsForSelectedDate variable
    // For example:
    // this.activeTenantsForSelectedDate = ...
}

  fetchOnboardedTenantsData() {
    this.tenantService.getOnboardedTenantsData().subscribe({
      next: (response) => {
        console.log('Onboarded Tenants Data:', response);

        // Update tenantsOnboardedData with fetched values and labels
        this.tenantsOnboardedData = [{ data: response.values, label: 'Tenants Onboarded' }];
        this.tenantsOnboardedLabels = response.labels;
        this.tenantsOnboardedOptions = { responsive: true };
      },
      error: (error) => {
        console.error('Error fetching onboarded tenants data:', error);
        this.snackbar.showNotification("snackbar-danger", error);
      }
    });
  }
  fetchTenantData() {
    this.tenantService.getTenant().subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.dataSource = new MatTableDataSource<any>(response.entity);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.snackbar.showNotification("snackbar-danger", error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  refresh() {
    // Implement logic to refresh tenant data
    this.fetchTenantData();
  }
  // Define the data and options for tenants onboarded bar graph


  // Define the data and options for deleted tenants bar graph
  // deletedTenantsData = [{ data: [5, 10, 15, 20], label: 'Deleted Tenants' }];
  // deletedTenantsLabels = ['January', 'February', 'March', 'April'];
  // deletedTenantsOptions = { responsive: true };

  issueContract(row) {
    console.log("Issue contract to: ", row);
    this.router.navigate(['/leasing/newcontract', row.id])
  }
  // updateTenantCall(data: any) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "60%"
  //   dialogConfig.data = {
  //     tenant: data
  //   }

  //   const dialogRef = this.dialog.open(UpTenantComponent, dialogConfig)
  //   dialogRef.afterClosed().subscribe((res)=> {
  //     this.fetchTenantData()
  //   })
  // }
  updateTenant(tenant) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "70%"
    dialogConfig.width = "800px";
    dialogConfig.data = {
      tenant,
    };

    const dialogRef = this.dialog.open(UpdatetenantComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.snackbar.showNotification("snackbar-success", "Tenant updated successfully.");
        this.fetchTenantData();
      }
    });
  }
  viewReportOptions() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.height = '70%'
    dialogConfig.width = '600px'
    dialogConfig.data = { test: "data" }

    const dialogRef = this.dialog.open(ReportoptionsComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
  deleteCall(event: any, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "100%"
    dialogConfig.data = {
      customer: data
    }

    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }
  getData() {
    
    this.isLoading = true
    
    this.tenantService.getTenant().subscribe(res => {
      this.data = res

      this.isLoading = false
      if (res.entity && res.entity.length > 0) {
        
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(res.entity);
        this.dataSource.paginator = this.paginator;
     

      } else {
        this.isLoading = false
     
        this.dataSource = new MatTableDataSource<any>(this.data);
      }

    },err=>{
        this.isLoading = false
        
        this.dataSource = new MatTableDataSource<any>(this.data);
    })
  }
  viewTenant(tenant) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      tenant,
    }

    const dialogRef = this.dialog.open(ViewTenantComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      
    })
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LeaseService } from '../../service/lease.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportoptionsComponent } from '../reportoptions/reportoptions.component';

import { MatTable } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ViewLeaseComponent } from '../view-lease/view-lease.component';
import { HttpParams } from '@angular/common/http';
import { DeleteLeaseComponent } from '../delete-lease/delete-lease.component';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';



@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.sass']
})
export class LeaseComponent implements OnInit {


  
  loading: Boolean
  isdata: Boolean = false
  subscription: Subscription
  data: any
  label: string
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["tenantName", "startDate", "endDate", "status", "actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selectedProperty: any;
  // params: HttpParams;



  constructor(
    private leaseService: LeaseService,
    private snackbar: SnackbarService,
    private snackBar: MatSnackBar,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getContracts();
    this.leaseService.getUpdateData().subscribe(() => {
      this.getContracts();
    });
  }



  getContracts() {
    this.loading = true;
    this.subscription = this.leaseService.getContracts().subscribe(
      (res) => {
        this.data = res
        if (this.data.entity.length > 0) {
          this.loading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.loading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.getContracts()

  }

  addNew() {

  }   
  pickProperty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };
  
    const dialogRef = this.dialog.open(PropertyLookupComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result); // Check if propertyId is present in the result
      if (result && result.propertyId) {
        this.selectedProperty = result.propertyName; // Update the selected property
        // Call API to get active contracts for the selected property
        this.leaseService.getActiveContractsPerProperty(result.propertyId)
          .subscribe(
            (activeContractsData) => {
              // Update the graphs based on the active contracts data
              this.updateGraphs(activeContractsData);
            },
            (error) => {
              console.error('Error fetching active contracts:', error);
              // Handle error, show error message, etc.
            }
          );
      }
    });
  }
  
  updateGraphs(activeContractsData: any) {
    // Update the graphs based on the active contracts data
    this.activeContractsData = activeContractsData.data;
    this.activeContractsLabels = activeContractsData.labels;
    this.activeContractsOptions = activeContractsData.options;
  }
  

  activeContractsData = [{ data: [], label: 'Active Contracts' }];
  activeContractsLabels = ['January', 'February', 'March', 'April'];
  activeContractsOptions = { responsive: true };

  // // Define the data and options for deleted tenants bar graph
  // deactivatedContractsData = [{ data: [10, 20, 30, 40], label: 'Deactivated Contracts' }];
  // deactivatedContractsLabels = ['January', 'February', 'March', 'April'];
  // deactivatedContractsOptions = { responsive: true };



  public viewLease(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(ViewLeaseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  downloadLease(row: any): void {
    const leaseId = row.id;
    console.log("id submitted", leaseId);
  
    let params = new HttpParams();
    params = params.set('leaseId', leaseId);
  
    this.leaseService.getLeaseReport(leaseId).subscribe({
      next: (res: Blob) => {
        console.log("our res", res);
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `Lease_${leaseId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
  
        // Display success message using MatSnackBar
        this.snackBar.open('Lease downloaded successfully!', 'Close', {
          duration: 3000 // Duration in milliseconds
        });
      },
      error: ((error) => {

      }),
      complete: (() => {

        })
  })
  

    //public next (res){}

    // const invoiceNumber = invoice.invoiceNumber;
    // this.leaseService.downloadLease(invoiceNumber).subscribe((data: Blob) => {
    //   const blob = new Blob([data], { type: 'application/pdf' });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   document.body.appendChild(a);
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = Lease_${invoiceNumber}.pdf;
    //   a.click();
    //   window.URL.revokeObjectURL(url);

  // });
}

public onDelete(row){

  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "800px";
  dialogConfig.data = {
    data: row
  };
  const dialogRef = this.dialog.open(DeleteLeaseComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
  });
}
viewReportOptions() {
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = true
  dialogConfig.autoFocus = true
  dialogConfig.width = '600px'
  dialogConfig.data = { test: "data" }
  const dialogRef = this.dialog.open(ReportoptionsComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
    console.log('closed');
  });
}
}
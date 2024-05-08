import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LeaseService } from '../../service/lease.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportoptionsComponent } from '../reportoptions/reportoptions.component';
import { ViewLeaseComponent } from '../view-lease/view-lease.component';
import { HttpParams } from '@angular/common/http';
import { DeleteLeaseComponent } from '../delete-lease/delete-lease.component';
import { TerminateDialogComponent } from '../terminate-dialog/terminate-dialog.component';
import { UpdateLeaseComponent } from '../update-lease/update-lease.component';




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
  activeContractsData = [{ data: [], label: 'Active Contracts', backgroundColor:'grey', hoverBackgroundColor: 'grey'}];
  activeContractsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'June' , 'July', 'Aug' ,'Sept', 'Oct', 'Nov','Dec'];
  activeContractsOptions = { responsive: true };
  terminatedContractsData = [{ data: [], label: 'Terminated Contracts', backgroundColor:'#3F51B5', hoverBackgroundColor: '#3F51B5'}];
  terminatedContractsLabels = ['Jan', 'Feb', 'Mar', 'Apr','May' , 'June' , 'July', 'Aug' ,'Sept', 'Oct', 'Nov','Dec'];
  terminatedContractsOptions = { responsive: true };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selectedProperty: any;
  rowdata: any;
  dialogRef: any;
  snackBar: any;
  // params: HttpParams;



  constructor(
    private leaseService: LeaseService,
    private snackbar: SnackbarService,
   
   
 private dialog: MatDialog
    

  ) { }

  ngOnInit(): void {
    this.getContracts();
    this.activeLease();
    this.terminatedLease();
    this.leaseService.getUpdateData().subscribe(() => {
      this.getContracts();
      
    });
  }
  activeLease(){
    this.leaseService.getActiveContracts().subscribe({
      next:(response)=>{
      
        this.activeContractsData=[{data: response.values,label:'Active Contracts',backgroundColor:'#3F51B5',hoverBackgroundColor: '#3F51B5'}];
       
        this.activeContractsLabels=response.labels;
        this.activeContractsOptions={responsive:true};
      },
      error:(error)=>{
        console.error('error in fetching active contacts:',error);
        this.snackBar.showNotification("snackbar",error);
      }
    })
  }
  terminatedLease(){
    this.leaseService.getterminatedContracts().subscribe({
      next:(response)=>{
      
        this.terminatedContractsData=[{data: response.values,label:'Terminated Contracts',backgroundColor:'#3F51B5',hoverBackgroundColor: '#3F51B5'}];
       
        this.terminatedContractsLabels=response.labels;
        this.terminatedContractsOptions={responsive:true};
      },
      error:(error)=>{
        console.error('error in fetching terminated contacts:',error);
        this.snackBar.showNotification("snackbar",error);
      }
    })
  }

  updateLease(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="90%"
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row
    };
console.log("the data"+row)
    const dialogRef = this.dialog.open(UpdateLeaseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.snackbar.showNotification("snackbar-success", "Contract updated successfully.");
        this.getContracts();
      }
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
  }

onDelete(row: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false; // Allow closing the dialog with backdrop click or ESC key
  dialogConfig.autoFocus = true; // Auto-focus on the first interactive element in the dialog
  dialogConfig.width = "800px"; // Set the width of the dialog
  dialogConfig.data = { data: row }; // Pass data (e.g., rowdata) to the dialog component

  const dialogRef = this.dialog.open(DeleteLeaseComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((result: any) => {
    // Handle dialog close event if needed
    console.log('Dialog result:', result);
    // You can perform actions based on the dialog result here
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
onTerminate() {
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = true
  dialogConfig.autoFocus = true
  dialogConfig.width = '600px'
  dialogConfig.data = { test: "data" }
  const dialogRef = this.dialog.open(TerminateDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
    console.log('closed');
  });
}

openTerminateDialog(lease: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';
    dialogConfig.data = {
      lease,
      contractId: lease.id,
      tenantName: lease.tenantName // Pass the tenant's name to the dialog
    }
 
  const dialogRef = this.dialog.open(TerminateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });
}


}
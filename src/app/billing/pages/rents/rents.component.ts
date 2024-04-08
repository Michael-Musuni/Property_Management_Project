import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../billing.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, Routes } from '@angular/router';
import { ViewRentComponent } from '../view-rent/view-rent.component';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.sass']
})
export class RentsComponent implements OnInit {
  selected = 'all';
  rents: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['invoiceNumber','status', 'amount', 'tenantName', 'unit','actions'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private router: Router,private billingService: BillingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchRents();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(){
    this.fetchRents()
  }

  fetchData() {
    if (this.selected == "all") {
      this.fetchRents();
    }
  else if (this.selected == "paid") {
    this.getPaidRents();
  }
  else if (this.selected == "standing") {
    this.getStandingRents();
  }

  }
  fetchRents(): void {
    this.isLoading = true;
    this.subscription= this.billingService.getAllRents()
      .subscribe(
        (data: any) => { 
          console.log("my rents",data);

           // Filter rows with item 'RENT'
          this.rents = data.entity.filter((rent: any) => rent.item === 'RENT');
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.rents);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching rents:', error);
          this.isLoading = false;
        }
      );
  
  }

  selectTenant() {
    this.router.navigate(['/tenants/manage']);
}
selectUnit() {
  this.router.navigate(['/property/main']);
}
  getPaidRents() {
    // Call API or filter the invoices array to get only paid invoices
    this.dataSource = new MatTableDataSource<any>(this.rents.filter(rent => rent.status === 'paid'));
}

  getStandingRents() {
    // Call API or filter the invoices array to get only not paid invoices
    this.dataSource = new MatTableDataSource<any>(this.rents.filter(rent => rent.status !== 'paid'));
}

viewRentDetails(rent: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "800px";
  dialogConfig.data = {
    rent,
  };
  const dialogRef = this.dialog.open(ViewRentComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
    // Perform any action after closing the dialog if needed
  });
}
}

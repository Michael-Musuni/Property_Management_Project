import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewRevenuesComponent } from '../view-revenues/view-revenues.component';
import { BillingService } from '../../billing.service';
import { MpesaDialogComponent } from '../mpesa-dialog/mpesa-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.sass']
})
export class RevenuesComponent implements OnInit {
  revenues: any[] = [];
  expenseName:any;
  isLoading: boolean = false;
  displayedColumns: string[] = ['propertyName','netAmount','incomeTax', 'date','actions'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<any>;
  selectedMonth: number; 
  selectedYear: number;
  months: { name: string, value: number }[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private router: Router, private billingService: BillingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedMonth = new Date().getMonth() + 1;

    // Populate months array
    this.months = [
      { name: 'January', value: 1 },
      { name: 'February', value: 2 },
      { name: 'March', value: 3 },
      { name: 'April', value: 4 },
      { name: 'May', value: 5 },
      { name: 'June', value: 6 },
      { name: 'July', value: 7 },
      { name: 'August', value: 8 },
      { name: 'September', value: 9 },
      { name: 'October', value: 10 },
      { name: 'November', value: 11 },
      { name: 'December', value: 12 },

      
    ];



    // Fetch revenues for the initially selected month
    this.fetchRevenues(this.selectedMonth);
  }

  onMonthSelectionChange(): void {
    // Fetch revenues for the selected month
    this.fetchRevenues(this.selectedMonth);
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh(selectedMonth: number) {
    this.fetchRevenues(selectedMonth);
  }

  fetchRevenues(month: number): void {
    this.isLoading = true;
    this.subscription = this.billingService.getAllRevenues(month)
      .subscribe(
        (data: any) => {
          console.log("my revenues", data);
          this.revenues = data.entity;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.revenues);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching revenues:', error);
          this.isLoading = false;
        }
      );
  }

  selectProperty() {
    this.router.navigate(['/property/main']);
  }

  viewRevenueDetails(revenue: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      revenue,
    };
    const dialogRef = this.dialog.open(ViewRevenuesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  openPaymentDialog(invoice: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      invoice,
    };

    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openMpesaDialog(invoice: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      invoice,
    };

    const dialogRef = this.dialog.open(MpesaDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

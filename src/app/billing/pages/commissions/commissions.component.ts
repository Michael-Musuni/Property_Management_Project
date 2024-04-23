import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BillingService } from '../../billing.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.sass']
})
export class CommissionsComponent implements OnInit {
  commissions: any[] = [];
  isLoading: boolean = false;
  
  displayedColumns: string[] = ['propertyName','commissionMonth','managementCommission','totalCommission'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<any>;
  selectedMonth: number; 
  months: { name: string, value: number }[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private router: Router, private billingService: BillingService) { }

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
    this.fetchCommissions(this.selectedMonth);
  }
  onMonthSelectionChange(): void {
    // Fetch revenues for the selected month
    this.fetchCommissions(this.selectedMonth);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(selectedMonth: number) {
    this.fetchCommissions(selectedMonth);
  }

  fetchCommissions(month: number): void {
    this.isLoading = true;
    this.subscription= this.billingService.getAllCommissions(month)
      .subscribe(
        (data: any) => { 
          console.log("my commissions",data);
         this.commissions = data.entity;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.commissions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching commissions:', error);
          this.isLoading = false;
        }
      );
  }
  selectProperty() {
    this.router.navigate(['/property/main']);
  }
}


 

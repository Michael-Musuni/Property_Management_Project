import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BillingService } from '../../billing.service';
import { Subscription } from 'rxjs';
import { AddExpensesComponent } from '../add-expenses/add-expenses.component';
import { Router } from '@angular/router';
import { DeleteExpensesComponent } from '../delete-expenses/delete-expenses.component';
import { UpdateExpensesComponent } from '../update-expenses/update-expenses.component';
import { ViewExpensesComponent } from '../view-expenses/view-expenses.component';

@Component({
  selector: 'app-total-expenses',
  templateUrl: './total-expenses.component.html',
  styleUrls: ['./total-expenses.component.sass']
})
export class TotalExpensesComponent implements OnInit {
  data: any
  selectedMonth: number; 
  months: { name: string, value: number }[];
  subscription: Subscription
  isLoading: Boolean
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['propertyName', 'expenses','month']
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private billingService: BillingService,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

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
    this.getTotalExpenses(this.selectedMonth);
  }
  onMonthSelectionChange(): void {
    // Fetch revenues for the selected month
    this.getTotalExpenses(this.selectedMonth);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(selectedMonth: number): void {
    this.getTotalExpenses(selectedMonth);
}
getMonthString(month: number): string {
  const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months[month - 1]; // Adjust for zero-based index
}
  getTotalExpenses(month: number) {
    
    this.subscription = this.billingService.getTotalExpenses(month).subscribe(res => {
      this.data = res
      console.log(this.data)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  selectProperty() {
    this.router.navigate(['/property/main']);
  }

 
}



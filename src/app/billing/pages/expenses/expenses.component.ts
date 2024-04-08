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
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent implements OnInit {
  data: any
  subscription: Subscription
  isLoading: Boolean
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['propertyName', 'unitName','expenseName','amount','actions']
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
    this.getExpenses()

  }
  applyFilter(event: Event) {


  }
  
  refresh() {

    this.getExpenses()

  }
  addExpenses() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "100%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddExpensesComponent, dialogConfig)
  }
  
  getExpenses() {
    
    this.subscription = this.billingService.getExpenses().subscribe(res => {
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

  viewExpenses(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      row,
    };
    const dialogRef = this.dialog.open(ViewExpensesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  editExpense(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: row
    }
    this.dialog.open(UpdateExpensesComponent, dialogConfig)
  }

  deleteExpense(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: row
    }
    this.dialog.open(DeleteExpensesComponent, dialogConfig)
  }


}



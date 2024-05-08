import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterDirective, ExportType } from 'mat-table-exporter';
import { Subscription } from 'rxjs';
import { BillingService } from '../../billing.service';


@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.sass']
})
export class DepositsComponent implements OnInit {
  
  selection = new SelectionModel<any>(true, []);
 
  data:any;
  isLoading: boolean = false;
  displayedColumns: string[] = ['propertyName', 'unitName', 'tenantName','phone', 'deposits']; // Removed extra comma
  subscription: Subscription; 
  selectedMonth: number;
  months: { name: string, value: number }[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  @ViewChild('exporter', { static: true }) exporter: MatTableExporterDirective;

  constructor(private router: Router, private billingService: BillingService
              
  ) { }

  ngOnInit(): void {
    this.fetchVatData();
  }
  
 fetchVatData(): void {
    this.isLoading = true;
    this.subscription = this.billingService.getDepositData()
      .subscribe(
        (data: any) => {
          console.log("my vat", data);
          this.data = data;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching vat:', error);
          this.isLoading = false;
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

  refresh(selectedMonth: number) {
    this.fetchVatData();
  }

  selectProperty() {
    this.router.navigate(['/property/main']);
  }

  exportData(format: ExportType | 'xls' | 'xlsx' | 'csv' | 'txt' | 'json'): void {
    this.exporter.exportTable(format, {
      fileName: 'vat-list',
      sheet: 'sheet1'
    });
  }
 
}
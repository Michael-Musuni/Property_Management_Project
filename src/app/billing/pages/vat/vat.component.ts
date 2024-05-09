import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BillingService } from '../../billing.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportType,MatTableExporterDirective   } from 'mat-table-exporter';




@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.sass']
})
export class VatComponent implements OnInit {
  data:any;
  selection = new SelectionModel<any>(true, []);
  vat: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['propertyId', 'grossRevenue', 'taxAmount', 'latePenalty','accumulatedOverdueTaxAndPenalty']; // Removed extra comma
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
      { name: 'December', value: 12 }
    ];

    // Fetch VAT data for the initially selected month
    this.fetchVatData(this.selectedMonth);
  }
  
  onMonthSelectionChange(): void {
    // Fetch VAT data for the selected month
    this.fetchVatData(this.selectedMonth);
    console.log("the data"+this.selectedMonth)
  }


  
  fetchVatData(month: number): void {
    this.isLoading = true;
    this.subscription = this.billingService.getVatData(month)
      .subscribe(
        (data: any) => {
          
          this.data = data;
          console.log("my vat", data);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
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
    this.fetchVatData(selectedMonth);
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
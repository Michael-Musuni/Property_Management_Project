import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TenantService } from '../tenant.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExportType, MatTableExporterDirective } from 'mat-table-exporter';



@Component({
  selector: 'app-property-unit',
  templateUrl: './property-unit.component.html',
  styleUrls: ['./property-unit.component.sass']
})
export class PropertyUnitComponent implements OnInit {
  loading: Boolean
  membersForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  memberTableDataSource = new MatTableDataSource<any>([]);
  data: any
  displayedColumns: string[] = [ "propertyName","unitName","phone"]
  subscription: any;
  isdata: boolean;
  paginator: any;
  sort: any;
  snackbar: any;
  @ViewChild('exporter', { static: true }) exporter: MatTableExporterDirective;
  isLoading: boolean = false;
  constructor(
    private tenantService:TenantService,
  ) { }

  ngOnInit(): void {
    this.getUnit();
  }
getUnit(){
    this.isLoading = true;
    this.subscription = this.tenantService.getunit()
      .subscribe(
        (data: any) => {
          console.log("my units", data);
          this.data = data;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching vat:', error);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.isdata = false;
          this.isLoading = false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }
 
  exportData(format: ExportType | 'xls' | 'xlsx' | 'csv' | 'txt' | 'json'): void {
    this.exporter.exportTable(format, {
      fileName: 'vat-list',
      sheet: 'sheet1'
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

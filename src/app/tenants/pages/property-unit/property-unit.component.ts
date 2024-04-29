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
  displayedColumns: string[] = ["name", "propertyName", "caretakerNo"]
  subscription: any;
  isdata: boolean;
  paginator: any;
  sort: any;
  snackbar: any;
  @ViewChild('exporter', { static: true }) exporter: MatTableExporterDirective;
  constructor(
    private tenantService:TenantService,
  ) { }

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits() {
    this.loading = true;
    this.subscription = this.tenantService.getunits().subscribe(
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

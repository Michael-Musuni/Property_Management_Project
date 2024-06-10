import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective, ExportType } from 'mat-table-exporter';
import { TenantService } from '../tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.sass']
})
export class PropertyDetailsComponent implements OnInit {
  loading: Boolean
  membersForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  memberTableDataSource = new MatTableDataSource<any>([]);
  data: any
  displayedColumns: string[] = [ "unitName","propertyName","amount","status","date"]
  subscription: any;
  isdata: boolean;
  paginator: any;
  sort: any;
  snackbar: any;
  id:any;
  @ViewChild('exporter', { static: true }) exporter: MatTableExporterDirective;
  isLoading: boolean = false;
  constructor(
    private tenantService:TenantService,
    private router: Router
  ) {
    
   this. id = router.getCurrentNavigation().extras.queryParams.id;
    console.log("sdfhjkfds",this. id)
   }

  ngOnInit(): void {
    this.getUnits(this.id);
  }
getUnits(id){
    this.isLoading = true;
    this.subscription = this.tenantService.getunits(this.id)
      .subscribe(
        (data: any) => {
          console.log("my units", data);
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

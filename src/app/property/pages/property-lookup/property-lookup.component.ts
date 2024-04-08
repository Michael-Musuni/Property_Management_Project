import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyService } from '../../services/property.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RentconfigurationsComponent } from 'src/app/property/pages/rentconfigurations/rentconfigurations.component';

@Component({
  selector: 'app-property-lookup',
  templateUrl: './property-lookup.component.html',
  styleUrls: ['./property-lookup.component.sass']
})
export class PropertyLookupComponent implements OnInit {

  loading:Boolean
  isdata: Boolean;
  subscription!: Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name", "type", "location", "owner"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(
    public dialogRef: MatDialogRef<RentconfigurationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private propertyService: PropertyService,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getProperties()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data });
  }

  getProperties() {
    this.loading = true;
    this.subscription = this.propertyService.getProperties().subscribe(
      (res) => {
        this.data = res
        if (this.data.length > 0) {
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

}

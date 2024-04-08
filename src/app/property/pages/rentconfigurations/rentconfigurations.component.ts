import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RentService } from '../../../rent/services/rent.service';

@Component({
  selector: 'app-rentconfigurations',
  templateUrl: './rentconfigurations.component.html',
  styleUrls: ['./rentconfigurations.component.sass']
})
export class RentconfigurationsComponent implements OnInit {

  loading = false;
  isdata: Boolean;
  data: any
  subscription!: Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["property_name", "owner_name", "rent_due_date", "late_payment_fee", "account_number", "pay_bill_number", "management_commission", "actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(

    private service: RentService,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getConfigurations()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.getConfigurations()

  }


  getConfigurations() {
    this.loading = true
    this.service.getConfigs().subscribe(
      (res) => {
        console.log(res)
        this.loading = false;
        this.data = res
        this.dataSource = new MatTableDataSource<any>(this.data.entity);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.loading = false;
        console.log(err)

        
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );

  }
}

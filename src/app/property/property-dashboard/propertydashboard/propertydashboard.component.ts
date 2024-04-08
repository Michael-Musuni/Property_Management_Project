import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboardservice/dashboard.service';
import { PropertyLookupComponent } from '../../pages/property-lookup/property-lookup.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-propertydashboard',
  templateUrl: './propertydashboard.component.html',
  styleUrls: ['./propertydashboard.component.sass']
})
export class PropertydashboardComponent implements OnInit {
units: any;
  subscription: any;
  data: any;
  loaded: boolean;
  totalProperties: any;
  allTenants: any;
  availableUnits: any;
  sentInvoices: any;
  name: string;
  dialog: any;
  dialogData: any;
  tenantForm: any;
  Leaseform: any;
  
  getChargesPerProperty(id: any) {
    throw new Error('Method not implemented.');
  }
  getUnitsPerProperty(arg0: string, id: any): any {
    throw new Error('Method not implemented.');
  }
constructor(private service: DashboardService) { }
  ngOnInit(): void {
    this.name="something"
    this.fetchDashboardData()
  }
  fetchDashboardData() {

    this.subscription = this.service.getpropertydata().subscribe(res => {
      this.data = res
      this.loaded = true; 

      console.log("mypropertydata",this.data)
      this.totalProperties=this.data.totalProperties
      this.allTenants=this.data.allTenants
      this.availableUnits=this.data.availableUnits
      this.sentInvoices=this.data.sentInvoices
    })
  }
}

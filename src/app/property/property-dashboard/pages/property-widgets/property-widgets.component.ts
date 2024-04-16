import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboardservice/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-widgets',
  templateUrl: './property-widgets.component.html',
  styleUrls: ['./property-widgets.component.scss']
})
export class PropertyWidgetsComponent implements OnInit {
  subscription: Subscription
  data: any
  name: string
  loading: boolean=false
  loaded:boolean=false

  totalProperties=0
  availableUnits=0
  allTenants=0
  paidInvoices=0
  constructor(private service: DashboardService) { }



  ngOnInit(): void {
    this.name="something"
    this.fetchDashboardData()
    this.fetchvacantunitsData
  }
  fetchDashboardData() {

    this.subscription = this.service.getWidgetsdata().subscribe(res => {
      this.data = res
      this.loaded = true; 

      console.log("mydashboardwidgetsdata",this.data)
      this.totalProperties=this.data.totalProperties
      this.allTenants=this.data.allTenants
      this.availableUnits=this.data.availableUnits
      this.paidInvoices=this.data.paidInvoices
    })
  };
  fetchvacantunitsData() {

    this.subscription = this.service.getvacantunitsdata().subscribe(res => {
      this.data = res
      this.loaded = true; 

      console.log("myvacantunitsdata",this.data)
      this.availableUnits=this.data.availableUnits
      
    })
  };
}

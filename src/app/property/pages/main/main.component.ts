import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { PropertyService } from '../../services/property.service';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
  
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  activeOptionButton: any;
  router: any;
  subscription: any;
  data: any;
  // loaded: boolean;
  name: string;
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  grid: any;
  responsive: any[];
  labels: any;
  role:any
  rentChartOptions: ChartOptions;
  chartOptions: any;

public rentchartoptions: { series: { data: any; name: string; }[]; chart: { type: string; height: number; }; xaxis: { categories: any; }; };
public rentpaidData: any = [{ data: [],  backgroundColor:'grey', hoverBackgroundColor: 'grey'}];
public rentpaidLabels: any = [];
public rentpaidOptions: any = [];
loaded = false;
  PropertyOnboardedData:  [ { data: any; label: string; }];
  PropertyOnboardedLabels: any;
  PropertyOnboardedOptions: { responsive: boolean; };


  constructor(
    private tokenStorageService: TokenStorageService, 
    private service: PropertyService
  ) {}

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0]
    this.getmonthlyrentdata();
    this.getpropertycountdata();
  }
  getmonthlyrentdata() {
    this.subscription = this.service.getmonthlyrentdata().subscribe(res => {
      this.data = res;
      console.log("mymonthlyrentdata", this.data);
      this.loaded = true;
      this.rentpaidData = [{ data: this.data.values, label: 'Rent Paid', backgroundColor:'#3F51B5',hoverBackgroundColor: '#3F51B5'}];
      this.rentpaidLabels = this.data.labels;
      this.rentpaidOptions = {
        responsive: true,
        // Add other necessary options
      };
    });
  } 
  getpropertycountdata() {
    this.subscription = this.service.getpropertycountdata().subscribe(res => {
      this.data = res;
      console.log("mypropertycountdata", this.data);
      this.loaded = true;
      this.PropertyOnboardedData  = [{ data: this.data.values, label: 'Property Onboarded'}];
      this.PropertyOnboardedLabels = this.data.labels;
      this.PropertyOnboardedOptions= {
        responsive: true,
        // Add other necessary options
      };
    });
  }
   
 
    issueContract(row) {
      console.log("Issue contract to: ", row);
      this.router.navigate(['/leasing/newcontract', row.id])
    }

    // public getpropertycountdata(){
    //   return this.http.get(`${environment.apiUrl}/api/v1/analytics/property-count`,httpOptions);
    // }
  }

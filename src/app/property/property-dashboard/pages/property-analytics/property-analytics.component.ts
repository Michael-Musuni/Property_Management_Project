import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels, ChartComponent, ApexTitleSubtitle, ApexGrid, ApexResponsive, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { DashboardService } from '../../dashboardservice/dashboard.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  responsive: ApexResponsive[];
  labels: any
};
@Component({
  selector: 'app-property-analytics',
  templateUrl: './property-analytics.component.html',
  styleUrls: ['./property-analytics.component.sass']
})
export class PropertyAnalyticsComponent implements OnInit {
  piechartbOptions: Partial<ChartOptions>;
  propertyName: any;
  areachartOptions: Partial<ChartOptions>;
  name: string;
  subscription: any;
  data: any;
  loading: boolean;
  loaded: boolean;
  chargesArray: any;
  fb: any;
  Propertyform: any;
  tenantData: any;
  dialog: any;
  dialogData: any;
  units: any;





  initializeForm() {
    this.chargesArray = this.fb.array([]);
    // this.getChargesPerProperty(this.dialogData.data.id);


    this.Propertyform = this.fb.group({
      propertyId: [''],
      propertyName: [''],


    });
  }

  
  getUnitsPerProperty(arg0: string, id: any): any {
    throw new Error('Method not implemented.');
  }
  getChargesPerProperty(id: any) {
    throw new Error('Method not implemented.');
  }

  @ViewChild("chart") chart: ChartComponent;
  public areaChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;
  public piechartOptions: any;
  


  constructor(private service: DashboardService) { }
  ngOnInit(): void {
    this.name = "something"
    this.getRevenuePieChartData()
    this.getLineGraphData()
    this.fetchRevenueFromPropertiesData()
    
    
  }
 pickProperty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(
      PropertyLookupComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.Propertyform.patchValue({

        propertyId: this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName

      });
      // this.units = this.getUnitsPerProperty("VACANT", this.dialogData.data.id);
      // this.getChargesPerProperty(this.dialogData.data.id)
      console.log("Selected property ID", this.dialogData.data.id)
      this.fetchDashboardData(this.dialogData.data.id)
    });

  }

  fetchRevenueFromPropertiesData() {
    this.subscription = this.service.getRevenueFromPropertiesData().subscribe(
      (res: any) => {
        this.data = res;
        console.log("RevenuefromPropertiesData: ", this.data);

        // Updating area chart options with received data
        this.areaChartOptions = {
          series: [{
            name: "Total Revenue",
            data: this.data.values
          }],
          chart: {
            height: 350,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            categories: this.data.labels
          }
        };


      },

    );
  }

  getLineGraphData() {
    this.subscription = this.service.getlinegraphdata().subscribe(res => {
      this.data = res
      console.log("mylinegraphdata", this.data)
      this.loaded = true;
      this.lineChartOptions = {
        series: [{
          name: "Desktops",
          data: this.data.values
        }],
        chart: {
          height: 350,
          width: 1000,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.data.labels
        }
      };
    })
  }

  getRevenuePieChartData() {
    this.subscription = this.service.getRevenuePieChartData().subscribe(
      res => {
        this.data = res

        console.log("myrevenuedata", this.data)
        this.loading = false;
        this.piechartOptions = {
          series: this.data.values,
          chart: {
            width: 500,
            type: "pie"
          },
          labels: this.data.labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

      },)

  }
  fetchDashboardData(propertyId: number) {

    this.subscription = this.service.getChartsdata(propertyId).subscribe(res => {
      this.data = res

      console.log("mychartsdata", this.data)
      this.loading = false;
      this.piechartbOptions = {
        series: this.data.values,
        chart: {
          width: 500,
          type: "pie"
        },
        labels: this.data.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };


    },)
  }
  fetchmypropertyData() {

    this.subscription = this.service.getpropertydata().subscribe(res => {
      this.data = res
      this.loaded = true;

      console.log("mypropertydata", this.data)
      this.Propertyform = this.data.propertyName

    })
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }


}



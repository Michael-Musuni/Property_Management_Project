import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from 'src/app/property/services/property.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mainconfig',
  templateUrl: './mainconfig.component.html',
  styleUrls: ['./mainconfig.component.sass']
})
export class MainconfigComponent  implements OnInit {
  isLoading: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  router: any;
  subscription: any;
  tenantForm: FormGroup;
  loading: boolean = false;
  i: number;
  data: any
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  dialogData: any
  units: any
 
  loaded: boolean;
  AmenityOnboardedData: { data: any; label: string; }[];
  AmenityOnboardedLabels: any;
  AmenityOnboardedOptions: { responsive: boolean; };
  utilityexpensesData: { data: any; label: string; }[];
  utilityexpensesLabels: any;
  utilityexpensesOptions: { responsive: boolean; };

  constructor(private service: PropertyService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getamenityonboardeddata()
    this.getutilitycostdata()
  }
  getamenityonboardeddata() {
    this.subscription = this.service.getamenityonboardeddata().subscribe(res => {
      this.data = res;
          console.log("myamenityonboardeddata", this.data);
          this.loaded = true;
          this.AmenityOnboardedData = [{ data: this.data.values, label: 'Amenity Onboarded' }];
          this.AmenityOnboardedLabels = this.data.labels;
          this.AmenityOnboardedOptions = {
            responsive: true,
            // Add other necessary options
          };
          this.isLoading = false;
        },
        (error: any) => {
          console.error("Error fetching amenity onboarded data:", error);
          this.isLoading = false;
        });
  };

  
  

  applyFilter() {
    // Implement filter logic
  }

  refresh() {
    // Implement refresh logic
  }

  addNew() {
    // Implement add new logic
  }

  getutilitycostdata() {
    this.subscription = this.service.getutilitycostdata().subscribe(res => {
      this.data = res;
          console.log("myutilitycostdata", this.data);
          this.loaded = true;
          this.utilityexpensesData  = [{ data: this.data.values, label: 'Utility Cost' }];
          this.utilityexpensesLabels = this.data.labels;
          this.utilityexpensesOptions = {
            responsive: true,
            // Add other necessary options
          };
          this.isLoading = false;
        },
        (error: any) => {
          console.error("Error fetching utility cost data:", error);
          this.isLoading = false;
        });
  };
 
  
  issueContract(row: { id: any; }) {
    console.log("Issue contract to: ", row);
    this.router.navigate(['/leasing/newcontract', row.id]);
  }
}
// public getutilitycostdata() {
//   return this.http.get(`${environment.apiUrl}/api/v1/analytics/utility-cost`,httpOptions);
// }

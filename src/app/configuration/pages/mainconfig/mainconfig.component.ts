import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mainconfig',
  templateUrl: './mainconfig.component.html',
  styleUrls: ['./mainconfig.component.sass']
})
export class MainconfigComponent implements OnInit {
  isLoading:Boolean
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = []
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  

  applyFilter(event: Event) {
 
  }
  refresh(){

  }
  addNew(){

  }
  // AmenityOnboardedData = [{ data: [10, 20, 30, 40], label: 'Amenity Onboarded' }];
  // AmenityOnboardedLabels = ['January', 'February', 'March', 'April'];
  // AmenityOnboardedOptions = { responsive: true };
  
  // Define the data and options for deleted tenants bar graph
  utilityexpensesData = [{ data: [5, 10, 15, 20], label: 'Utility Costs' }];
  utilityexpensesLabels = ['January', 'February', 'March', 'April'];
  utilityexpensesOptions = { responsive: true };
  
    issueContract(row) {
      console.log("Issue contract to: ", row);
      this.router.navigate(['/leasing/newcontract', row.id])
    }
}


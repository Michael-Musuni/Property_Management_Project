import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { PropertyManagementComponent } from '../property-management/property-management.component';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-report-options',
  templateUrl: './report-options.component.html',
  styleUrls: ['./report-options.component.sass']
})
export class ReportOptionsComponent implements OnInit {

  optionsForm: FormGroup;

  options: string[] = ['Units occupied', 'Units unoccupied', 'Units per property'];
  filteredOptions: Observable<string[]>;

  propertyNamesOptions: string[];
  filteredPropertyNames: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PropertyManagementComponent>,
    private propertyService: PropertyService) { }

  ngOnInit(): void {

    this.optionsForm = this.formBuilder.group({
      reportType: ["", Validators.required],
      propertyName: ["", Validators.required]
    });

    this.filteredOptions = this.optionsForm.get("reportType")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredPropertyNames = this.optionsForm.get("propertyName")?.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.propertyService.getProperties().pipe(
        map((res: any) => {
          this.propertyNamesOptions = res.entity.map((entity: any) => entity.propertyName);
          return this._filterPropertyNames(value || '');
        })
      ))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterPropertyNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.propertyNamesOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  public downloadReport() {
    // Add your download logic here
    const reportType = this.optionsForm.value.reportType;
    const propertyName = this.optionsForm.value.propertyName;
    console.log("property name", propertyName)
    if (reportType === "Units occupied") {
      console.log("property type", reportType)
      this.propertyService.downloadUnitsOccupiedReport(propertyName).subscribe({
        next: ((res) => {
          console.log("response", res);
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = `Report_${propertyName}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        }),
        error: ((error) => {

        }),
        complete: (() => { })
      })
    }
    if (reportType === "Units unoccupied") {
      console.log("property name", propertyName)

      this.propertyService.downloadUnitsunoccupiedReport(propertyName).subscribe({
        next: ((res) => {
          
            console.log("response", res);
            const blob = new Blob([res], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = `Report_${propertyName}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);

            this.dialogRef.close();
       

        }),
        error: ((error) => {
          console.log("error", error);
          this.dialogRef.close();

        }),
        complete: (() => { })
      })

    }
    
    
    if (reportType === "Units per property") {
      console.log("property type", reportType)
      this.propertyService.downloadUnitsperPropertyReport(propertyName).subscribe({
        next: ((res) => {
          
            console.log("response", res);
            const blob = new Blob([res], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = `Report_${propertyName}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);

            this.dialogRef.close();
        
        }),
        // error: ((error) => {
        //   console.log("error", error);
        //   this.dialogRef.close();

        // }),
        // complete: (() => { })
      })

    }
  }
}

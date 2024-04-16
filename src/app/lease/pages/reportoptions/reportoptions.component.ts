import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { LeaseComponent } from '../lease/lease.component';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaseService } from '../../service/lease.service';

@Component({
  selector: 'app-reportoptions',
  templateUrl: './reportoptions.component.html',
  styleUrls: ['./reportoptions.component.sass']
})
export class ReportoptionsComponent implements OnInit {

  optionsForm: FormGroup;

  options: string[] = ['Active contracts', 'Terminated contracts'];
  filteredOptions: Observable<string[]>;

  propertyNamesOptions: string[];
  filteredPropertyNames: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LeaseComponent>,
    private propertyService: LeaseService) { }

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
    if (reportType === "Active contracts") {
      console.log("property name", propertyName)
      this.propertyService.downloadActiveContractsReport(propertyName).subscribe({
        next: ((res) => {
          console.log("response", res);
          const blob = new Blob([res], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = Report_${ propertyName }.pdf;
        a.click();
        window.URL.revokeObjectURL(url);
      }),
        error: ((error) => {

        }),
          complete: (() => { })
    })
  }
  if(reportType === "Terminated contracts") {
  console.log("property name", propertyName)
  this.propertyService.downloadTerminatedContractsReport(propertyName).subscribe({
    next: ((res) => {
      console.log("response", res);
      const blob = new Blob([res], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = Report_${ propertyName }.pdf;
    a.click();
    window.URL.revokeObjectURL(url);
  }),
    error: ((error) => {

    }),
      complete: (() => { })
})


    }
  }
}
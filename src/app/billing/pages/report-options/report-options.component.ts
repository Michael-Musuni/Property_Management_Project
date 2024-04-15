import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { InvoicesComponent } from '../invoices/invoices.component';
import { BillingService } from '../../billing.service';
// const today = new Date();
// const month = today.getMonth();
// const year = today.getFullYear();

@Component({
  selector: 'app-report-options',
  templateUrl: './report-options.component.html',
  styleUrls: ['./report-options.component.sass']
})
export class ReportOptionsComponent implements OnInit {
  optionsForm: FormGroup;
  monthForm: FormGroup;
  dateForm: FormGroup;
  selectedStartDate: Date;
  selectedEndDate: Date;

  options: string[] = ['Paid Invoice', 'Unpaid Invoice',];
  filteredOptions: Observable<string[]>;

  propertyNamesOptions: string[];
  filteredPropertyNames: Observable<string[]>;
  service: any;
form: any;

  // months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // filteredMonths: Observable<string[]>;



  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private propertyService: BillingService) { }



  ngOnInit(): void {
    this.optionsForm = this.formBuilder.group({
      reportType: ["", Validators.required],
      propertyName: ["", Validators.required],

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
    this.dateForm = this.formBuilder.group({
      start: [null],
      end: [null]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterPropertyNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.propertyNamesOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  fetchData(): void {
    const startDate = this.dateForm.get('start').value;
    const endDate = this.dateForm.get('end').value;

    // Call your service method to fetch blob data with start and end dates as parameters
    this.service.fetchBlobData(startDate, endDate).subscribe((blobData) => {
      // Process the blob data here
      // For example, you can download the blob data or display it in your UI
    });
  }




  public downloadReport() {
    // Add your download logic here
    const reportType = this.optionsForm.value.reportType;
    const propertyName = this.optionsForm.value.propertyName;
    const startDate = this.dateForm.get('start').value;
    const endDate = this.dateForm.get('end').value;


    console.log("property name:", propertyName);
    console.log("start date:", startDate);
    console.log("end date:", endDate);

    if (reportType === "Paid Invoice") {
      console.log("property type", reportType)
      this.propertyService.downloadPaidInvoiceReport(propertyName, startDate, endDate).subscribe({
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

    if (reportType === "Unpaid Invoice") {
      console.log("property name:", propertyName);
      console.log("start date:", startDate);
      console.log("end date:", endDate);

      this.propertyService.downloadUnpaidInvoiceReport(propertyName, startDate, endDate).subscribe({
        next: ((res) => {

          
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
          console.log("response", res);

        }),
        error: ((error) => {
          console.log("error", error);
  
          this.dialogRef.close();

        }),
        complete: (() => { })
      })

    }
  }
}
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

  options: string[] = ['Paid Invoice', 'Unpaid Invoice',];
  filteredOptions: Observable<string[]>;

  propertyNamesOptions: string[];
  filteredPropertyNames: Observable<string[]>;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  filteredMonths: Observable<string[]>;


  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private propertyService: BillingService) { }
  // campaignOne = new FormGroup({
  //   start: new FormControl(new Date(year, month, 13)),
  //   end: new FormControl(new Date(year, month, 16)),
  // });
  // campaignTwo = new FormGroup({
  //   start: new FormControl(new Date(year, month, 15)),
  //   end: new FormControl(new Date(year, month, 19)),
  // });


  ngOnInit(): void {
    this.optionsForm = this.formBuilder.group({
      reportType: ["", Validators.required],
      propertyName: ["", Validators.required],
      selectedMonth: ['']
      // start: ["", Validators.required],
      // end: ["", Validators.required]
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
    this.filteredMonths = this.monthForm.get('selectedMonth').valueChanges.pipe(
      startWith(''),
      map(value => this._filterMonths(value))
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

  private _filterMonths(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.months.filter(month => month.toLowerCase().includes(filterValue));
  }

  
 public downloadReport() {
  // Add your download logic here
  const reportType = this.optionsForm.value.reportType;
  const propertyName = this.optionsForm.value.propertyName;
  console.log("property name", propertyName)
  if (reportType === "Paid Invoice") {
    console.log("property type", reportType)
    this.propertyService.downloadPaidInvoiceReport(propertyName).subscribe({
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
    console.log("property name", propertyName)

    this.propertyService.downloadUnpaidInvoiceReport(propertyName).subscribe({
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
}
}
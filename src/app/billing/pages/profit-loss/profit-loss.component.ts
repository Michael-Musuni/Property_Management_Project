import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { BillingService } from '../../billing.service';
import { RevenuesComponent } from '../revenues/revenues.component';
@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.sass']
})
export class ProfitLossComponent implements OnInit {
  optionsForm: FormGroup;
  options: string[] = ['P & L per property'];
  monthForm: FormGroup;
  dateForm: FormGroup;
  selectedStartDate: Date;
  selectedEndDate: Date;
  maxEndDate = new Date();
  minStartDate: Date;
  filteredOptions: Observable<string[]>;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  filteredMonths: Observable<string[]>;
  years: string[] = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];


  propertyNamesOptions: string[];
  filteredPropertyNames: Observable<string[]>;
  billingService: any;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RevenuesComponent>,
    private propertyService: BillingService) { }

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
    const filterValue = value.toLowerCase().trim(); // Trim any leading or trailing spaces
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterPropertyNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.propertyNamesOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  public downloadProfitandLoss() {
    // Add your download logic here
    const reportType = this.optionsForm.value.reportType;
    const propertyName = this.optionsForm.value.propertyName;
    console.log("property name", propertyName)
    if (reportType === "P&L per property") {
      alert("Download will start shortly...");
      console.log("property name", propertyName)
      this.billingService.downloadProfitandLossPerPropertyReport(propertyName).subscribe({
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
    if (reportType === "Terminated contracts") { }
  }

}

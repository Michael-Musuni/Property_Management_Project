
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RentsComponent } from './pages/rents/rents.component';
import { MainBillingComponent } from './pages/mainbilling/mainbilling.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { BillingRoutingModule } from './billing-routing.module';
import { CommissionsComponent } from './pages/commissions/commissions.component';

import { PrintInvoiceComponent } from './pages/print-invoice/print-invoice.component';

import { RevenuesComponent } from './pages/revenues/revenues.component';
import { TenantDetailsComponent } from './pages/tenant-details/tenant-details.component';
import { UploadBillComponent } from './pages/upload-bill/upload-bill.component';
import { ViewInvoiceComponent } from './pages/view-invoice/view-invoice.component';

import { ViewRentComponent } from './pages/view-rent/view-rent.component';
import { ViewRevenuesComponent } from './pages/view-revenues/view-revenues.component';

import { MatDatepicker } from '@angular/material/datepicker';
import { ViewExpensesComponent } from './pages/view-expenses/view-expenses.component';
import { DeleteExpensesComponent } from './pages/delete-expenses/delete-expenses.component';
import { UpdateExpensesComponent } from './pages/update-expenses/update-expenses.component';
import { SendOptionsDialogComponent } from './pages/send-options-dialog/send-options-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { PaymentDialogComponent } from './pages/payment-dialog/payment-dialog.component';
import { CheckerDialogComponent } from './pages/checker-dialog/checker-dialog.component';
import { TotalExpensesComponent } from './pages/total-expenses/total-expenses.component';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';



import { AddExpensesComponent,} from './pages/add-expenses/add-expenses.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { ReportOptionsComponent } from './pages/report-options/report-options.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VatComponent } from './pages/vat/vat.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';


@NgModule({
  declarations: [
    RentsComponent,
    InvoicesComponent,
    ExpensesComponent,
    MainBillingComponent,
    CommissionsComponent,
    
    ViewInvoiceComponent,
    ViewRentComponent,
    TenantDetailsComponent,
    RevenuesComponent,
    UploadBillComponent,
    PrintInvoiceComponent,
    ViewRevenuesComponent,
    AddExpensesComponent,

    ViewExpensesComponent,
    DeleteExpensesComponent,
    UpdateExpensesComponent,

    ReportOptionsComponent,
    VatComponent,
    SendOptionsDialogComponent,
    PaymentDialogComponent,
    CheckerDialogComponent,
    TotalExpensesComponent,
    AllExpensesComponent

  ],
  imports: [
    CommonModule,
    
    SharedModule,
    PerfectScrollbarModule,
    ComponentsModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule,
    MatTableModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
   
    MatSnackBarModule, 
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    BillingRoutingModule,

    
    MatNativeDateModule,
    MatRadioModule,
    ChartsModule
  ]
})
export class BillingModule { }

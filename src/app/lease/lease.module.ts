import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaseRoutingModule } from './lease-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { LeaseComponent } from './pages/lease/lease.component';

import { ReportoptionsComponent } from './pages/reportoptions/reportoptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


import { ChartsModule } from 'ng2-charts';
import { LeaseformComponent } from './pages/leaseform/leaseform.component';
import { ViewLeaseComponent } from './pages/view-lease/view-lease.component';


 @NgModule ({
  declarations: [
    LeaseformComponent,
    ReportoptionsComponent,
    LeaseComponent,
    ViewLeaseComponent,
    DeleteLeaseComponent
    
  ],

  imports: [
    ComponentsModule,
    CommonModule,
    PerfectScrollbarModule,
    SharedModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,

    ChartsModule,

    LeaseRoutingModule,
    ChartsModule,

  ]
})
export class LeaseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantManagementComponent } from './pages/tenant-management/tenant-management.component';
import { ComponentsModule } from '../shared/components/components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AddTenantComponent } from './pages/add-tenant/add-tenant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { IdverificationComponent } from './pages/idverification/idverification.component';

import { ReportoptionsComponent } from './pages/reportoptions/reportoptions.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';


import { UpdatetenantComponent } from './pages/updatetenant/updatetenant.component';
import { ChartsModule } from 'ng2-charts';

import { DeleteComponent } from './pages/delete/delete.component';
import { ViewTenantComponent } from './pages/view-tenant/view-tenant.component';
import { PropertyUnitComponent } from './pages/property-unit/property-unit.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';




@NgModule({
  declarations: [
    TenantManagementComponent ,
    AddTenantComponent,
    IdverificationComponent,
    DeleteComponent,
    PropertyUnitComponent,

    ReportoptionsComponent,
 

    UpdatetenantComponent,
    UpdatetenantComponent,
    ReportoptionsComponent,
    ViewTenantComponent,
    PropertyDetailsComponent,
  
 
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
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    TenantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    // AsyncPipe,

    ChartsModule,
    MatAutocompleteModule,
    MatSortModule,
    
    

  ],
  providers: [DatePipe  ],
    
})
export class TenantsModule { }
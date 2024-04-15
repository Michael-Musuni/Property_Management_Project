import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PropertyRoutingModule } from './property-routing.module';


import { SharedModule } from '../shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { PropertyManagementComponent } from './pages/property-management/property-management.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddpropertyComponent } from './pages/addproperty/addproperty.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { PropertyLookupComponent } from './pages/property-lookup/property-lookup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RentconfigurationsComponent } from './pages/rentconfigurations/rentconfigurations.component';
import { MainComponent } from './pages/main/main.component';
import { PropertyOwnersComponent } from './pages/property-owners/property-owners.component';

import { MatNativeDateModule } from '@angular/material/core';
import { ReportOptionsComponent } from './pages/report-options/report-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    PropertyManagementComponent,
    AddpropertyComponent,
    PropertyLookupComponent,
    RentconfigurationsComponent,
    MainComponent,
    PropertyOwnersComponent,
    ReportOptionsComponent,
   
  ],

 

  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    ComponentsModule,  
    //angular material
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule,
    MatTableModule,
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
    MatProgressBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule,
    PropertyRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    // AsyncPipe

    ChartsModule

  ],
  providers: [HttpClient ], 
})

export class PropertyModule { }

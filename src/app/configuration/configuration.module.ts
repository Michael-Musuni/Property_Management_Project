import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { MainconfigComponent } from './pages/mainconfig/mainconfig.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { ChartsModule } from 'ng2-charts';

import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { UtilitiesComponent } from './pages/utilities/utilities.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAmenitiesComponent } from './pages/add-amenities/add-amenities.component';
import { AddUtilitiesComponent } from './pages/add-utilities/add-utilities.component';
import { EditAmenityComponent } from './pages/edit-amenity/edit-amenity.component';
import { EditUtilityComponent } from './pages/edit-utility/edit-utility.component';
import { DeleteUtilityComponent } from './pages/delete-utility/delete-utility.component';
import { DeleteAmenityComponent } from './pages/delete-amenity/delete-amenity.component';
import { WaterServiceComponent } from './pages/water-service/water-service.component';
import { AddWaterComponent } from './pages/add-water/add-water.component';


@NgModule({
  declarations: [
    MainconfigComponent,
    AmenitiesComponent,
    UtilitiesComponent,
    AddAmenitiesComponent,
    AddUtilitiesComponent,
    EditAmenityComponent,
    EditUtilityComponent,
    DeleteUtilityComponent,
    DeleteAmenityComponent,
    WaterServiceComponent,
    AddWaterComponent,


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
    MatTabsModule,
    MatRadioModule,
    ConfigurationRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ConfigurationRoutingModule,
    ChartsModule
  ]
})
export class ConfigurationModule { }

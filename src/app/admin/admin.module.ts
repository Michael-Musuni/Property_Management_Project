import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { PrivelegeComponent } from './privelege/privelege.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatIconModule } from "@angular/material/icon";
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatTableExporterModule } from "mat-table-exporter";
// import { MatPaginatorModule } from "@angular/material/paginator/paginator-module";




@NgModule({
  declarations: [  
  
    PrivelegeComponent
  ],
  imports: [CommonModule,
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AdminRoutingModule,
    MatTableExporterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class AdminModule {}

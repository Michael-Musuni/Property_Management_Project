import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertydashboardComponent } from './propertydashboard/propertydashboard.component';
import { InvoicesComponent } from 'src/app/billing/pages/invoices/invoices.component';


const routes: Routes = [
  {
    path: "dashboard",
   component: PropertydashboardComponent
  },
  {
    path: "invoice",
   component: InvoicesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDashboardRoutingModule { }
